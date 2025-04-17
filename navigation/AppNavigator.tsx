import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '@/auth/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {token ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        {/* Add more protected screens here */}
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
