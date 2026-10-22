type StorageKind = 'local' | 'session';

function getStore(kind: StorageKind): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export const safeStorage = {
  get(key: string, kind: StorageKind = 'local'): string | null {
    const store = getStore(kind);
    if (!store) return null;
    try {
      return store.getItem(key);
    } catch {
      return null;
    }
  },

  set(key: string, value: string, kind: StorageKind = 'local'): boolean {
    const store = getStore(kind);
    if (!store) return false;
    try {
      store.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  remove(key: string, kind: StorageKind = 'local'): boolean {
    const store = getStore(kind);
    if (!store) return false;
    try {
      store.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
