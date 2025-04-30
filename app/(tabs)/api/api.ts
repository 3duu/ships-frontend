import axios from 'axios';
import { handleApiError } from '@/app/utils/errors';
import * as SecureStore from 'expo-secure-store';
import { refreshToken as requestRefreshToken } from './auth';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api',
    timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) prom.resolve(token);
        else prom.reject(error);
    });
    failedQueue = [];
};

// Request interceptor to attach token
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized = error?.response?.status === 401;
        const isRetry = originalRequest._retry;

        if (isUnauthorized && !isRetry) {
            originalRequest._retry = true;

            const refresh = await SecureStore.getItemAsync('refreshToken');
            if (!refresh) {
                processQueue(error, null);
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err: any) => {
                            reject(err);
                        },
                    });
                });
            }

            isRefreshing = true;

            try {
                const data = await requestRefreshToken(refresh);
                await SecureStore.setItemAsync('authToken', data.token);
                if (data.refreshToken) {
                    await SecureStore.setItemAsync('refreshToken', data.refreshToken);
                }

                api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
                originalRequest.headers.Authorization = `Bearer ${data.token}`;

                processQueue(null, data.token);
                return api(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                await SecureStore.deleteItemAsync('authToken');
                await SecureStore.deleteItemAsync('refreshToken');
                handleApiError(refreshErr);
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        handleApiError(error);
        return Promise.reject(error);
    }
);

export default api;
