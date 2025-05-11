import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function getItemAsync(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
        return Promise.resolve(localStorage.getItem(key));
    }

    try {
        //console.log(key);
        return SecureStore.getItemAsync(key);
    } catch (err) {
        console.error('[SecureStore App Error]' + ' - ' + key, err);
        return Promise.reject(err);
    }
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
    try {
        if (value){
            return SecureStore.setItemAsync(key, value);
        }

    } catch (err) {
        console.error('[SecureStore App Error]' + ' - ' + key, err);
        return Promise.reject(err);
    }

}

export async function deleteItemAsync(key: string): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
    console.log(key);
    return SecureStore.deleteItemAsync(key);
}
