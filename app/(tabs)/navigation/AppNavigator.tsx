import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { AuthProvider } from '@/app/(tabs)/auth/AuthContext';
import AppNavigator from '@/app/(tabs)/navigation/AppNavigator';

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
