import { Slot } from 'expo-router';
import { AuthProvider } from '@/app/(tabs)/auth/AuthContext';

export default function Layout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
