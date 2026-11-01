/** Flat, fingerprinted entry scripts retain the site-base calculation in every mode. */
declare const RELEASE_ASSET_DIRECTORY: string;
export const scope = new URL('../', import.meta.url).href;
export const releaseFile = (path: string): URL => new URL(
  (typeof RELEASE_ASSET_DIRECTORY === 'string' ? RELEASE_ASSET_DIRECTORY : '') + path,
  scope,
);
