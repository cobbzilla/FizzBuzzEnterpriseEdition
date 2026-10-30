/** The audience receiving desk has one fixed upstream and accepts no browser credentials. */
export const intakePath = '/intake/e/';
export async function proxyIntake(request: Request, send: typeof fetch = fetch, clientIP?: string): Promise<Response> {
 const url = new URL(request.url);
 const reply = (body: BodyInit | null, status: number, extra?: HeadersInit) => new Response(body, {
  status, headers: {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra},
 });
 if (url.pathname !== intakePath) return reply('Unknown receiving desk', 404);
 const origin = request.headers.get('Origin');
 if (origin && origin !== url.origin) return reply('Cross-origin submission not authorized', 403);
 if (request.method === 'OPTIONS') return reply(null, 204, {Allow: 'POST, OPTIONS'});
 if (request.method !== 'POST') return reply('Method not allowed', 405, {Allow: 'POST, OPTIONS'});
 const headers = new Headers({'Accept-Encoding':'identity'});
 for (const name of ['content-type', 'content-encoding', 'user-agent']) {
  const value = request.headers.get(name); if (value) headers.set(name, value);
 }
 // Workers supplies a trusted edge address; preview adapters supply their socket address.
 if (clientIP) headers.set('X-Forwarded-For', clientIP);
 const upstream = new URL('https://us.i.posthog.com/e/'); upstream.search = url.search;
 try {
  const response = await send(upstream, {
   method: 'POST', headers, body: await request.arrayBuffer(),
   redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(15000),
  });
  if (response.status >= 300 && response.status < 400) return reply('Ingestion redirect refused', 502);
  const result = new Headers({'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'});
  for (const name of ['content-type', 'content-encoding', 'retry-after']) {
   const value = response.headers.get(name); if (value) result.set(name, value);
  }
  return new Response(response.body, {status: response.status, headers: result});
 } catch {
  return reply('Audience receiving desk temporarily unavailable', 502);
 }
}
