import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function getItemAsync(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
        return Promise.resolve(localStorage.getItem(key));
    }
    return SecureStore.getItemAsync(key);
}

export async function setItemAsync(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
        try {
            localStorage.setItem(key, value);
            return Promise.resolve();
        } catch (err) {
            console.error('[SecureStore Web Error]', err);
            return Promise.reject(err);
        }
    }
    return SecureStore.setItemAsync(key, value);
}

export async function deleteItemAsync(key: string): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
}
