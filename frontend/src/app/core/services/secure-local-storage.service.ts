import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  private secretKey = environment.tokensKey;

  set<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      const encryptedValue = CryptoJS.AES.encrypt(
        jsonValue,
        this.secretKey,
      ).toString();
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Encryption and data saving error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue) as T;
    } catch (error) {
      console.error('Data decryption error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Data deletion error:', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}
