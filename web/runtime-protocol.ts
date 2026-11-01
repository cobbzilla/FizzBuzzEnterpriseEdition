/** Protocol 1 preserves the journal schema and the retained 0..1000 mandate contract. */
export const runtimeProtocol = 1;

/** These desks use no audit or cache state and may run in a release-local worker. */
export function isTransientOperation(path: string, method = 'GET'): boolean {
  return method === 'GET' && ['/operations/runtime','/fizzbuzz/window','/fizzbuzz/window/explained', '/capacity/forecast/extended', '/procurement/dossier', '/onboarding/rehearsal'].includes(path.split('?')[0]);
}
