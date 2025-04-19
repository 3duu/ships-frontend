import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '@/app/(tabs)/api/auth';
import axios from '@/app/(tabs)/api/api';
import * as SecureStore from '../auth/SafeSecureStore';

interface AuthContextProps {
    userId: string | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    userId: null,
    token: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = await SecureStore.getItemAsync('authToken');
            const storedUserId = await SecureStore.getItemAsync('userId');

            if (storedToken && storedUserId) {
                setToken(storedToken);
                setUserId(storedUserId);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
            setLoading(false);
        };

        restoreSession();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await apiLogin(email, password);
        setToken(res.token);
        setUserId(res.userId);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

        await SecureStore.setItemAsync('authToken', res.token);
        await SecureStore.setItemAsync('userId', res.userId);
    };

    const register = async (name: string, email: string, password: string) => {
        const res = await apiRegister(name, email, password);
        setToken(res.token);
        setUserId(res.userId);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

        await SecureStore.setItemAsync('authToken', res.token);
        await SecureStore.setItemAsync('userId', res.userId);
    };

    const logout = async () => {
        setToken(null);
        setUserId(null);
        delete axios.defaults.headers.common['Authorization'];
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('userId');
    };

    return (
        <AuthContext.Provider value={{ userId, token, login, register, logout, loading }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }
    return context;
};
