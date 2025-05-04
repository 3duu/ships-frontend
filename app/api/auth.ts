import axios from './api'; // shared axios instance
import * as SecureStore from '@/app/(tabs)/auth/SafeSecureStore';

export interface Location {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
}

export interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
    gender: string; // "male", "female", "non-binary", etc.
    interests: string[];
    birth: string; // ISO string (from time.Time)
    location: Location;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    authToken: string;
    refreshToken: string;
    user: User;
}

export async function verifyEmail(token: string): Promise<void> {
    const response = await axios.post('/auth/verify-email', { token });
    return response.data;
}

export async function logoutFromServer() {
    return axios.post('auth/auth/logout');
}

export async function registerAccount(name: string, email: string, password: string): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>('public/auth/register', { name, email, password });

    if (!data?.user?.id) {
        throw new Error('Invalid API response: missing user.id');
    }

    await SecureStore.setItemAsync('authToken', data.authToken);
    await SecureStore.setItemAsync('userId', data.user.id);
    await SecureStore.setItemAsync('refreshToken', data.refreshToken);

    return data;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>('public/auth/login', { email, password });

    if (!data?.user?.id) {
        throw new Error('Invalid API response: missing user.id');
    }

    await SecureStore.setItemAsync('authToken', data.authToken);
    await SecureStore.setItemAsync('userId', data.user.id);
    await SecureStore.setItemAsync('refreshToken', data.refreshToken);

    return data;
}

export async function refreshToken(refreshToken: string) {
    const response = await axios.post('auth/auth/refresh', {
        refreshToken,
    });

    return response.data; // { token: string, refreshToken?: string }
}