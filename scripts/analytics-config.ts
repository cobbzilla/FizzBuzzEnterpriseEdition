import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
export async function analyticsConfig() {
 const file=process.env.SLOPBUZZ_POSTHOG_ENV_FILE;
 const values=file?parseEnv(await readFile(file,'utf8')):{};
 const enabled=process.env.SLOPBUZZ_ANALYTICS_ENABLED==='true';
 const token=process.env.POSTHOG_TOKEN||values.POSTHOG_TOKEN||'';
 if(enabled&&!/^phc_[\w-]+$/.test(token))throw new Error('Analytics requires a public PostHog project token');
 return {enabled,token:enabled?token:'',apiHost:'https://us.i.posthog.com',environment:process.env.SLOPBUZZ_ANALYTICS_ENVIRONMENT==='preview'?'preview':'production',allowLocal:process.env.SLOPBUZZ_ANALYTICS_ALLOW_LOCAL==='true'};
}
