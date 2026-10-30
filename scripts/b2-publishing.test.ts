import {test} from 'node:test';
import assert from 'node:assert/strict';
import {serve} from '../deploy/b2-worker.ts';
import {settings, metadata, digest} from './b2-support.ts';
import {needsUpload, uploadFiles, type Payload} from './b2-upload.ts';

const env = {B2_ORIGIN: 'https://f004.backblazeb2.com/file/test-bucket/site/'};
const config = {B2_BUCKET_ID: 'bucket', B2_KEY_ID: 'key', B2_APP_KEY: 'secret', CLOUDFLARE_ACCOUNT_ID: 'account', CLOUDFLARE_ZONE_ID: 'zone', CLOUDFLARE_API_TOKEN: 'token', SLOPBUZZ_PUBLIC_URL: 'https://example.org'};
const file = (path: string): Payload => {
 const bytes = Buffer.from(path);
 return {path, bytes, sha1: digest(bytes), ...metadata(path)};
};
const noWait = async () => {};

test('configuration requires credentials and a root HTTPS origin; defaults need no flags', () => {
 const c = settings(config);
 assert.equal(c.prefix, 'site/');
 assert.equal(c.worker, 'slopbuzz-public-site');
 assert.equal(c.dry, false);
 for (const url of ['http://example.org', 'https://example.org/site/', 'https://x:secret@example.org', 'https://example.org?a=1', 'https://example.org/#anchor']) {
  assert.throws(() => settings({...config, SLOPBUZZ_PUBLIC_URL: url}));
 }
 assert.throws(() => settings({...config, B2_APP_KEY: undefined}), /B2_APP_KEY/);
 assert.throws(() => settings({...config, B2_PREFIX: '../private'}));
 assert.equal(settings({...config, B2_PREFIX: 'releases/public', B2_PUBLISH_DRY_RUN: 'true'}).prefix, 'releases/public/');
});

test('directory routes resolve inside the bucket prefix and discard only the origin query', async () => {
 for (const [path, target] of [['/', 'index.html'], ['/api/?utm_campaign=test', 'api/index.html'], ['/assets/abc.js?v=2', 'assets/abc.js']]) {
  const result = await serve(new Request('https://example.org' + path), env, async (url, options) => {
   assert.equal(String(url), env.B2_ORIGIN + target);
   assert.equal(options?.redirect, 'error');
   return new Response('ok', {headers: {'Content-Type': 'text/html', 'X-Bz-File-Id': 'private-metadata'}});
  });
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('X-Bz-File-Id'), null);
  assert.match(result.headers.get('Content-Security-Policy')!, /wasm-unsafe-eval/);
  assert.equal(result.headers.get('Cache-Control'), 'no-cache');
 }
 const redirect = await serve(new Request('https://example.org/api?review=1'), env);
 assert.equal(redirect.status, 308);
 assert.equal(redirect.headers.get('Location'), 'https://example.org/api/?review=1');
 assert.equal((await serve(new Request('http://example.org/api/?review=1'), env)).headers.get('Location'), 'https://example.org/api/?review=1');
});

test('invalid paths, writes, missing files and upstream failure never become successful pages', async () => {
 const forbiddenFetch = async () => {throw new Error('Origin should not be called');};
 for (const path of ['/%zz', '/%2fother/index.html', '//other/index.html', '/a%2f..%2fsecret', '/a%5cb', '/a%00b']) {
  assert.equal((await serve(new Request('https://example.org' + path), env, forbiddenFetch)).status, 400, path);
 }
 assert.equal((await serve(new Request('https://example.org/', {method: 'POST'}), env, forbiddenFetch)).status, 405);
 assert.equal((await serve(new Request('https://example.org/missing.html'), env, async () => new Response('B2 error', {status: 404}))).status, 404);
 assert.equal((await serve(new Request('https://example.org/'), env, async () => new Response('B2 error', {status: 503}))).status, 502);
 assert.equal((await serve(new Request('https://example.org/'), env, forbiddenFetch)).status, 502);
});

test('HEAD, range and conditional requests preserve semantics; immutable assets retain their policy', async () => {
 const result = await serve(new Request('https://example.org/assets/0123456789abcdef/runtime-worker.js', {method: 'HEAD', headers: {Range: 'bytes=0-2'}}), env, async (_, options) => {
  assert.equal(options?.method, 'HEAD');
  assert.equal(new Headers(options?.headers).get('Range'), 'bytes=0-2');
  return new Response(null, {status: 206, headers: {'Content-Type': 'text/javascript', 'Content-Length': '3', 'Content-Range': 'bytes 0-2/10'}});
 });
 assert.equal(result.status, 206);
 assert.equal(await result.text(), '');
 assert.equal(result.headers.get('Content-Range'), 'bytes 0-2/10');
 assert.match(result.headers.get('Cache-Control')!, /immutable/);
 assert.match(result.headers.get('Content-Security-Policy')!, /'unsafe-eval'/);
 const conditional = await serve(new Request('https://example.org/index.html', {headers: {'If-None-Match': 'version'}}), env, async (_, options) => {
  assert.equal(new Headers(options?.headers).get('If-None-Match'), 'version');
  return new Response(null, {status: 304, headers: {ETag: 'version'}});
 });
 assert.equal(conditional.status, 304);
});

test('repeat publication skips matching bytes and metadata but repairs changed policy', () => {
 const payload = file('assets/0123456789abcdef/wasm/main.wasm');
 assert.equal(payload.contentType, 'application/wasm');
 const remote = {contentSha1: payload.sha1, contentType: payload.contentType, fileInfo: {'b2-cache-control': payload.cache}};
 assert.equal(needsUpload(payload, remote), false);
 assert.equal(needsUpload(payload, {...remote, contentSha1: 'old'}), true);
 assert.equal(needsUpload(payload, {...remote, contentType: 'text/plain'}), true);
 assert.equal(needsUpload(payload, {...remote, fileInfo: {}}), true);
 assert.equal(needsUpload(payload), true);
});

test('uploads are bounded to four consumers and finish dependencies before HTML and service worker', async () => {
 const files = [...Array.from({length: 9}, (_, i) => file(`assets/0123456789abcdef/${i}.js`)), file('runtime-config.json'), file('index.html'), file('release.json'), file('sw.js')];
 let active = 0, maximum = 0;
 const finished: string[] = [];
 await uploadFiles(files, 'site/', async () => ({uploadUrl: 'https://upload.example/', authorizationToken: 'scoped'}), async (_, options) => {
  const headers = new Headers(options?.headers);
  const path = headers.get('X-Bz-File-Name')!.slice(5);
  const current = files.find(f => f.path === path)!;
  assert.ok(files.filter(f => f.stage < current.stage).every(f => finished.includes(f.path)));
  assert.equal(headers.get('Content-Length'), String(current.bytes.length));
  assert.equal(headers.get('Content-Type'), current.contentType);
  assert.equal(headers.get('X-Bz-Info-b2-cache-control'), encodeURIComponent(current.cache));
  assert.equal(decodeURIComponent(headers.get('X-Bz-Info-b2-cache-control')!), current.cache);
  active++; maximum = Math.max(maximum, active);
  await new Promise(resolve => setTimeout(resolve, 2));
  active--; finished.push(path);
  return Response.json({contentSha1: headers.get('X-Bz-Content-Sha1')});
 }, noWait);
 assert.equal(maximum, 4);
 assert.equal(finished.at(-1), 'sw.js');
 assert.equal(finished.length, files.length);
});

test('transient uploads refresh their token; permanent failures stop before release publication', async () => {
 let tokens = 0, attempts = 0;
 const payload = file('assets/main.js');
 const getUpload = async () => ({uploadUrl: 'https://upload.example/', authorizationToken: String(++tokens)});
 await uploadFiles([payload], 'site/', getUpload, async () => {
  if (++attempts === 1) throw new Error('Connection closed');
  if (attempts === 2) return new Response('', {status: 503});
  return Response.json({contentSha1: payload.sha1});
 }, noWait);
 assert.equal(tokens, 3);
 attempts = 0;
 await assert.rejects(uploadFiles([payload, file('sw.js')], 'site/', getUpload, async (_, options) => {
  assert.equal(new Headers(options?.headers).get('X-Bz-File-Name'), 'site/assets/main.js');
  attempts++;
  return Response.json({contentSha1: 'corrupt'});
 }, noWait), /checksum/);
 assert.equal(attempts, 4);
});
