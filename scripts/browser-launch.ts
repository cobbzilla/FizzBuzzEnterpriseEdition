import type {BrowserType} from '@playwright/test';

/** The same browser checks can run in a locally resource-capped Playwright container. */
export const browserConnection=()=>process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT?{
 wsEndpoint:process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT,
 exposeNetwork:'<loopback>',timeout:30000
}:undefined;
export async function launchBrowser(type:BrowserType){const connection=browserConnection();return connection?type.connect(connection.wsEndpoint,{exposeNetwork:connection.exposeNetwork,timeout:connection.timeout}):type.launch();}
