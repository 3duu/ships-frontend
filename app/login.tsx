import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AuthHeader from '@/components/Auth/AuthHeader';
import AuthTextInput from '@/components/Auth/AuthTextInput';
import RememberMeRow from '@/components/Auth/RememberMeRow';
import SocialLogins from '@/components/Auth/SocialLogins';
import SubmitButton from '@/components/Auth/SubmitButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';
import styles from "react-native-webview/lib/WebView.styles";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#1f45ef',
            alignItems: 'center',
            padding: 20,
            paddingTop: 60,
        },
        register: {
            color: '#fff',
            marginTop: 10,
            textAlign: 'center',
        },
        link: {
            textDecorationLine: 'underline',
            color: '#fff',
        },
    });

    const handleLogin = async () => {
        try {
            await login(email, password);
            // Redirect or handle post-login logic
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <View style={styles.container}>
            <AuthHeader />

            <AuthTextInput
                icon="email-outline"
                placeholder="Email"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
            />

            <AuthTextInput
                icon="lock-outline"
                placeholder="Password"
                secure={!showPassword}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#999"
                        />
                    </TouchableOpacity>
                }
            />

            <RememberMeRow value={rememberMe} onToggle={setRememberMe} />

            <SubmitButton title="LOGIN" onPress={handleLogin} />

            <SocialLogins />

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.register}>
                    Don’t have an account? <Text style={styles.link}>Register now</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
