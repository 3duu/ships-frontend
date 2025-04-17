import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function App(): JSX.Element {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
