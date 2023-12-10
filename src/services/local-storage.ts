import SecureLS from 'secure-ls';

const sLocalStorage = new SecureLS({
  encodingType: 'rc4',
  isCompression: true,
  encryptionSecret: process.env.VUE_APP_ENCRYPTION_SECRET,
});

class SecureLocalStorageAdapter {
  localStorage: SecureLS;

  constructor(secureLS: SecureLS) {
    this.localStorage = secureLS;
  }

  setItem(key: string, value: any): void {
    this.localStorage.set(key, value);
  }

  getItem(key: string): any {
    return this.localStorage.get(key);
  }

  removeItem(key: string): void {
    this.localStorage.remove(key);
  }

  clear(): void {
    this.localStorage.removeAll();
  }
}

export const storage = process.env.NODE_ENV ? localStorage : new SecureLocalStorageAdapter(sLocalStorage);
