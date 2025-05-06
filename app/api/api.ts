import axios from 'axios';
import { handleApiError } from '@/app/utils/errors';
import { refreshToken as requestRefreshToken } from './auth';
import {useExternalLogout} from "@/app/(tabs)/auth/AuthContext";
import Toast from "react-native-toast-message";
import * as SecureStore from '@/app/(tabs)/auth/SafeSecureStore';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.68.108:8080/api', // update for your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
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
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            console.warn('Error reading token from SecureStore:', err);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (res) => res,
    async (error) => {

        if (!error || !error.config) {
            console.error('Error retrieving response from SecureStore:', error);
            handleApiError(error);
            return Promise.reject(error);
        }

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
                await SecureStore.setItemAsync('authToken', data.authToken);
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

                Toast.show({
                    type: 'error',
                    text1: 'Session Expired',
                    text2: 'Please log in again.',
                });

                setTimeout(() => {
                    const logout = useExternalLogout();
                    logout();
                }, 1500); // 1.5s delay so user sees toast

                const logout = useExternalLogout();
                logout();

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
