import axios from './api'; // shared axios instance
import * as SecureStore from 'expo-secure-store';

interface LoginResponse {
    token: string;
    userId: string;
    refreshToken: string;
    data: any;
}

export async function verifyEmail(token: string): Promise<void> {
    const response = await axios.post('/auth/verify-email', { token });
    return response.data;
}

export async function logoutFromServer() {
    return axios.post('/auth/logout'); // or DELETE if you prefer
}

export async function registerAccount(name: string, email: string, password: string) {
    const response : LoginResponse  = await axios.post('/auth/register', { name, email, password });
    await SecureStore.setItemAsync('authToken', response.token);
    await SecureStore.setItemAsync('refreshToken', response.refreshToken);
    return response.data; // { token, userId }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response : LoginResponse = await axios.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('authToken', response.token);
    await SecureStore.setItemAsync('refreshToken', response.refreshToken);
    return response.data; // { token, userId }
}

export async function refreshToken(refreshToken: string) {
    const response = await axios.post('/auth/refresh', {
        refreshToken,
    });

    return response.data; // { token: string, refreshToken?: string }
}