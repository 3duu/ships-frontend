import React from 'react';
import { AuthProvider } from '@/app/(tabs)/auth/AuthContext';
import AppNavigator from '@/app/(tabs)/navigation/AppNavigator';

export default function App(): JSX.Element {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
