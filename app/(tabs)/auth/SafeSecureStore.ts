import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const getItemAsync = async (key: string) => {
    return isWeb ? null : SecureStore.getItemAsync(key);
};

export const setItemAsync = async (key: string, value: string) => {
    return isWeb ? undefined : SecureStore.setItemAsync(key, value);
};

export const deleteItemAsync = async (key: string) => {
    return isWeb ? undefined : SecureStore.deleteItemAsync(key);
};
