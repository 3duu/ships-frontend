import axios from './api'; // shared axios instance

interface LoginResponse {
    token: string;
    userId: string;
}

export async function verifyEmail(token: string): Promise<void> {
    const response = await axios.post('/auth/verify-email', { token });
    return response.data;
}

export async function logout(): Promise<void> {
    // Optional backend call to invalidate token
    return Promise.resolve();
}

export async function registerAccount(name: string, email: string, password: string) {
    const response = await axios.post('/auth/register', { name, email, password });
    return response.data; // { token, userId }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post('/auth/login', { email, password });
    return response.data; // { token, userId }
}