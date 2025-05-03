import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AuthHeader from '@/components/Auth/AuthHeader';
import AuthTextInput from '@/components/Auth/AuthTextInput';
import RememberMeRow from '@/components/Auth/RememberMeRow';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';
import { globalStyles } from '@/app/design/globalStyles';
import { handleApiError } from '@/app/utils/errors';
import DynamicButton from "@/components/DynamicButton"; // ✅ Your toast+log handler

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false); // ✅ new loading state

    const isFormValid = email.length > 0 && password.length > 0;

    const handleLogin = async () => {
        if (!isFormValid) return;

        try {
            setSubmitting(true);
            await login(email, password);
            router.replace('/home');
        } catch (err: any) {
            handleApiError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/images/login-illustration.png')}
            style={globalStyles.bg}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={globalStyles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={globalStyles.bottomContainer}>
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

                    <DynamicButton
                        title="LOGIN"
                        onPress={handleLogin}
                        disabled={!isFormValid || submitting}
                        loading={submitting}
                    />

                    <TouchableOpacity onPress={() => router.push('/register')}>
                        <Text style={globalStyles.register}>
                            Don’t have an account?{' '}
                            <Text style={globalStyles.link}>Register now</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
