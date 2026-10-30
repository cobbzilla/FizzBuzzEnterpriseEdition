/** Durable institutional memory. Acknowledgement follows IDB transaction completion. */
export async function openRepository(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('entries');
      request.result.createObjectStore('cache');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Repository upgrade blocked by an older tab. Close the other tabs.'));
  });
}
export function transaction<T>(db: IDBDatabase, store: string, mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const request = action(tx.objectStore(store));
    tx.oncomplete = () => resolve(request.result);
    tx.onabort = () => reject(tx.error || request.error || new Error('Repository transaction aborted'));
    tx.onerror = () => { /* onabort rejects after rollback */ };
  });
}
export function hostCapabilities(db?: IDBDatabase) {
  return async (operation: string, value: string): Promise<string> => {
    switch (operation) {
      case 'random-hex': {
        const size = Number(value);
        if (size !== 8 && size !== 16) throw new Error('Unsupported entropy mandate');
        const bytes = new Uint8Array(size);
        do {crypto.getRandomValues(bytes);} while (bytes.every(byte => byte === 0));
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
      }
      case 'sha256': {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
        return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
      }
      case 'load': return db ? JSON.stringify(await transaction(db, 'entries', 'readonly', s => s.getAll())) : '[]';
      case 'append': {
        if (!db) throw new Error('Transient proceedings cannot append to institutional memory');
        // add, never put: a stale owner cannot overwrite a committed sequence.
        await transaction(db, 'entries', 'readwrite', s => s.add(value, Number(value.split('|')[0])));
        return 'COMMITTED';
      }
      case 'cache-get': {
        if (!db) return 'MISS';
        const row = await transaction<{expires: number; body: string} | undefined>(db, 'cache', 'readonly', s => s.get(value));
        return row && row.expires > Date.now() ? `HIT:${row.body}` : 'MISS';
      }
      case 'cache-put': {
        if (!db) throw new Error('Transient proceedings cannot populate the retained cache');
        const separator = value.indexOf('|');
        const key = value.slice(0, separator);
        if (!/^\d{1,4}$/.test(key) || Number(key) > 1000) throw new Error('Unratified cache key');
        // 1001 bounded keys, each containing at most 1000 lines.
        await transaction(db, 'cache', 'readwrite', s => s.put({expires: Date.now() + 86_400_000, body: value.slice(separator + 1)}, key));
        return 'STORED';
      }
      default: throw new Error(`Unknown host capability: ${operation}`);
    }
  };
}
