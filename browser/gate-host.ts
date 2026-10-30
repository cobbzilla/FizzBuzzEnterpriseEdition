declare global {
  interface Window {
    enterpriseHost: (operation: string, value: string) => Promise<string>;
    enterpriseResult?: string;
    TeaVM: {wasmGC: {load: (path: string) => Promise<{exports: {main: (args: string[]) => void}}>}};
    main: (args: string[]) => void;
  }
}
const engine = new URL(location.href).searchParams.get('engine')!;
const db = await new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(`slopbuzz-compiler-gate-${engine}`, 1);
  request.onupgradeneeded = () => request.result.createObjectStore('entries');
  request.onerror = () => reject(request.error);
  request.onsuccess = () => resolve(request.result);
});
window.enterpriseHost = async (operation, value) => {
  if (operation === 'sha256') {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return [...new Uint8Array(bytes)].map(value => value.toString(16).padStart(2, '0')).join('');
  }
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('entries', 'readwrite');
    tx.objectStore('entries').put(value, Number(value.split('|')[0]));
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error);
  });
  return 'COMMITTED';
};
try {
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = engine === 'wasm' ? '/wasm/classes.wasm-runtime.js' : '/js/enterprise.js';
    script.onload = () => resolve(); script.onerror = reject; document.head.append(script);
  });
  if (engine === 'wasm') {
    const runtime = await window.TeaVM.wasmGC.load('/wasm/enterprise.wasm');
    runtime.exports.main([]);
  } else window.main([]);
} catch (error) { window.enterpriseResult = `ERROR: ${error}`; }
export {};
