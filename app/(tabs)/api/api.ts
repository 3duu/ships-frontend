import axios from 'axios';
import { handleApiError } from '@/app/utils/errors';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api',
    timeout: 10000,
});

// Optionally attach token
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global response error handler
api.interceptors.response.use(
    (response) => response,
    (error) => {
        handleApiError(error);
        return Promise.reject(error); // still reject so caller can handle if needed
    }
);

export default api;
