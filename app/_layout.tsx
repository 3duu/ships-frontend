import { Slot, useRouter, useSegments } from 'expo-router';
import {AuthProvider, useAuth} from '@/app/(tabs)/auth/AuthContext';
import { useEffect } from 'react';

function ProtectedLayout() {
    const { token, loading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!loading) {
            const inAuthGroup = segments[0] === 'login' || segments[0] === 'auth';
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
            <ProtectedLayout />
        </AuthProvider>
    );
}