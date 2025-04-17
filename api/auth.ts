import axios from './api'; // shared axios instance

interface LoginResponse {
    token: string;
    userId: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post('/auth/register', { name, email, password });
    return response.data;
}

export async function verifyEmail(token: string): Promise<void> {
    await axios.post('/auth/verify-email', { token });
}

export async function logout(): Promise<void> {
    // Optional backend call to invalidate token
    return Promise.resolve();
}
