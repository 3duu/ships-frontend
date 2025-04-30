import { Slot, useRouter, useSegments } from 'expo-router';
import {AuthProvider, useAuth} from '@/app/(tabs)/auth/AuthContext';
import { useEffect } from 'react';
import AuthGuard from "@/app/(tabs)/auth/AuthGuard";

function ProtectedLayout() {
    const { token, loading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!loading) {
            console.log(segments[0]);
            const inAuthGroup = segments[0] === 'login' || segments[0] === 'auth'|| segments[0] === 'register';
            if (!token && !inAuthGroup) {
                router.replace('/login');
            }
            if (token && inAuthGroup) {
                router.replace('/(tabs)');
            }
        }
    }, [segments, token, loading]);

    return <Slot />;
}

export default function Layout() {
    return (
        <AuthProvider>
            <AuthGuard>
                <Slot />
            </AuthGuard>
        </AuthProvider>
    );
}