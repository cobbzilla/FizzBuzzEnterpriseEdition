// Frozen pre-upgrade protocol-1 owner from 0adc813. Deliberately has no compatibility support.
/// <reference lib="webworker" />
import { openRepository, hostCapabilities } from '../../web/storage';
import type { JavaRuntime, RuntimeConfig, WorkerMessage, WorkerReply } from '../../web/contracts';
declare const self: DedicatedWorkerGlobalScope & JavaRuntime & {
  enterpriseHost: ReturnType<typeof hostCapabilities>;
  TeaVM: {wasmGC: {load(url: string): Promise<{exports: JavaRuntime}>}};
};
self.onmessage = async (event: MessageEvent<{config: RuntimeConfig; scope: string; isolated?: string}>) => {
  const {config, scope, isolated} = event.data;
  self.onmessage = null;
  const namespace = `slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ''}`;
  const channel = new BroadcastChannel(namespace);
  const leader = crypto.randomUUID();
  const reply = (message: WorkerReply) => channel.postMessage(message);
  await navigator.locks.request(namespace, async () => {
    let engine = 'wasm';
    let fallbackReason: string | undefined;
    let java: JavaRuntime;
    let failure: string | undefined;
    try {
      const storageHost = hostCapabilities(await openRepository(namespace));
      self.enterpriseHost = async (operation,value) => operation === 'runtime' ? JSON.stringify({mode:'browser',engine,fallbackReason,storage:'IndexedDB',cache:'IndexedDB',revision:config.revision,protocol:1}) : storageHost(operation,value);
      if (config.engine === 'js') throw new Error('Fallback requested for validation');
      importScripts(new URL(`${config.assets}wasm/classes.wasm-runtime.js`, scope).href);
      java = (await self.TeaVM.wasmGC.load(new URL(`${config.assets}wasm/enterprise.wasm`, scope).href)).exports;
    } catch (error) {
      engine = 'js';
      fallbackReason = String(error);
      console.info('WebAssembly admission declined:', fallbackReason);
      try {
        if (!self.enterpriseHost) throw error;
        importScripts(new URL(`${config.assets}js/enterprise.js`, scope).href);
        java = self;
      } catch (fallbackError) { failure = String(fallbackError); }
    }
    if (!failure) {
      try { await (config.validation && isolated ? java!.initializeValidation(config.revision) : java!.initialize(config.revision)); }
      catch (error) { failure = `Institutional memory could not be admitted: ${error}`; }
    }
    let queue: Promise<void> = Promise.resolve();
    channel.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (!['hello', 'request'].includes(message.kind)) return;
      if (message.kind === 'hello') {
        reply({kind: 'ready', id: message.id, revision: config.revision, leader, engine, error: failure});
        return;
      }
      if (message.leader !== leader) return;
      queue = queue.then(async () => {
        try {
          if (message.revision !== config.revision) throw new Error('A different release owns this repository. Close older tabs and reload.');
          if (failure) throw new Error(failure);
          let result: import('../../web/contracts').RuntimeReply;
          if (isolated && message.path === '/__validation/contracts') {
            result={status:200,headers:{},body:await java!.validateContracts()};
          } else if (isolated && message.path?.startsWith('/__validation/output?limit=')) {
            result={status:200,headers:{},body:await java!.validateOutput(Number(message.path.split('=')[1]))};
          } else if (isolated && config.validation && message.path?.startsWith('/__validation/advance?millis=')) {java!.advance(Number(message.path.split('=')[1]));result={status:200,headers:{},body:'ADVANCED'};
          } else result = JSON.parse(await java!.request(message.method!, message.path!, message.traceparent || ''));
          reply({kind: 'reply', id: message.id, revision: config.revision, leader, result});
        } catch (error) { reply({kind: 'reply', id: message.id, revision: config.revision, leader, error: String(error)}); }
      });
    };
    // The browser releases this exclusive lock when the worker dies. Never replay a request.
    await new Promise(() => {});
  });
};
