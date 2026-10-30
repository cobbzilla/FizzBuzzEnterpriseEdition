import {retry} from './b2-support.ts';

export interface Payload {
 path: string;
 bytes: Uint8Array<ArrayBuffer>;
 sha1: string;
 contentType: string;
 cache: string;
 stage: number;
}
export interface RemoteFile {
 contentSha1: string;
 contentType: string;
 fileInfo?: Record<string, string>;
}
export function needsUpload(file: Payload, remote?: RemoteFile): boolean {
 return !remote || remote.contentSha1 !== file.sha1 || remote.contentType !== file.contentType || remote.fileInfo?.['b2-cache-control'] !== file.cache;
}

/** Each consumer owns its upload token; stages finish before their dependents begin. */
export async function uploadFiles(
 files: Payload[], prefix: string,
 getUpload: () => Promise<{uploadUrl: string; authorizationToken: string}>,
 send: typeof fetch = fetch,
 pause?: (ms: number) => Promise<unknown>,
) {
 for (let stage = 0; stage <= 3; stage++) {
  const pending = files.filter(file => file.stage === stage);
  const results = await Promise.allSettled(Array.from({length: Math.min(4, pending.length)}, async () => {
   let upload: Awaited<ReturnType<typeof getUpload>> | undefined;
   while (pending.length) {
    const file = pending.shift()!;
    await retry(async () => {
     try {
      upload ??= await getUpload();
      const response = await send(upload.uploadUrl, {
       method: 'POST',
       headers: {
        Authorization: upload.authorizationToken,
        'X-Bz-File-Name': (prefix + file.path).split('/').map(encodeURIComponent).join('/'),
        'Content-Type': file.contentType,
        'Content-Length': String(file.bytes.length),
        'X-Bz-Content-Sha1': file.sha1,
        'X-Bz-Info-b2-cache-control': encodeURIComponent(file.cache),
       },
       body: file.bytes,
       signal: AbortSignal.timeout(120000),
      });
      if (!response.ok) throw new Error(`B2 upload HTTP ${response.status}`);
      if ((await response.json()).contentSha1 !== file.sha1) throw new Error('Upload checksum mismatch');
     } catch (error) {
      upload = undefined;
      throw error;
     }
    }, pause);
   }
  }));
  const failure = results.find(result => result.status === 'rejected');
  if (failure?.status === 'rejected') throw failure.reason;
 }
}
