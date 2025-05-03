import React, { createContext, useContext, useEffect, useState } from 'react';
import {login as apiLogin, logoutFromServer, registerAccount as apiRegister} from '@/app/api/auth';
import axios from '@/app/api/api';
import * as SecureStore from '@/app/(tabs)/auth/SafeSecureStore';
import {router} from "expo-router";


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

let externalLogout: () => void = () => {};

export const useExternalLogout = () => externalLogout;

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
        setUserId(res.user.id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

        await SecureStore.setItemAsync('authToken', res.token);
        await SecureStore.setItemAsync('userId', res.user.id);
    };

    const register = async (name: string, email: string, password: string) => {
        const res = await apiRegister(name, email, password);
        setToken(res.token);
        setUserId(res.user.id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

        await SecureStore.setItemAsync('authToken', res.token);
        await SecureStore.setItemAsync('userId', res.user.id);
    };

    const logout = async () => {
        try {
            await logoutFromServer();
        } catch (err) {
            console.warn('Logout error:', err); // non-blocking
        }

        delete axios.defaults.headers.common['Authorization'];
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('userID');

        router.replace('/login');
    };

    externalLogout = logout;

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


