import { useAuth } from './AuthContext';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';

    useEffect(() => {
        if (loading) return;

        if (!token && !inAuthGroup) {
            router.replace('/login');
        } else if (token && inAuthGroup) {
            router.replace('/');
        }
    }, [token, loading, segments]);

    return <>{children}</>;
}
