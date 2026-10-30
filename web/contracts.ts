export interface RuntimeConfig { mode: 'browser' | 'server'; apiBaseUrl?: string; revision: string; assets: string; engine?: 'auto' | 'js'; validation?: boolean }
export interface RuntimeReply { status: number; headers: Record<string, string>; body: string }
export interface RuntimeClient { request(path: string, options?: RequestInit): Promise<Response> }
export interface JavaRuntime { initialize(revision: string): Promise<string>; initializeValidation(revision: string): Promise<string>; validateContracts(): Promise<string>; validateOutput(limit: number): Promise<string>; advance(millis: number): void; request(method: string, target: string, traceparent: string): Promise<string> }
export type WorkerMessage = { kind: 'hello' | 'request'; id: string; revision: string; leader?: string; method?: string; path?: string; traceparent?: string };
export interface WorkerReply { kind: 'ready' | 'reply'; id: string; revision: string; leader: string; engine?: string; result?: RuntimeReply; error?: string }
