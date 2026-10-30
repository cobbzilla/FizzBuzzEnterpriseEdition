export type Usage = {event:'slopbuzz_demo_run'|'slopbuzz_api_request'; outcome:'success'|'failure'; runtime_mode:'browser'|'server'; duration_ms:number; status?:number; endpoint?:string; method?:string; cache_outcome?:string};
export function trackUsage(detail: Usage) { window.dispatchEvent(new CustomEvent('slopbuzz:usage',{detail})); }
