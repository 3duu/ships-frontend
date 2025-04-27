import React, { useState } from 'react';
import StepAccount from './StepAccount';
import StepProfile from './StepProfile';
import StepLocation from './StepLocation';
import StepPhotos from './StepPhotos';
import {globalStyles} from "@/app/design/globalStyles";

import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AuthTextInput from '@/components/Auth/AuthTextInput';
import SubmitButton from '@/components/Auth/SubmitButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { register } from '@/app/(tabs)/api/auth';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';



export default function RegisterScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let isFormValid = name && email && password;

    const handleNext = async () => {
        try {
            isFormValid = name && email && password;
            await register(name, email, password);
            await login(email, password);
            router.replace('/(tabs)'); // or next step in registration
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/register-bg.png')}
            style={globalStyles.bg}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={globalStyles.overlay}
            >
                <View style={globalStyles.container}>
                    <Text style={globalStyles.title}>Create Account</Text>

                    <AuthTextInput
                        icon="account"
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

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
                </View>

                {/* Bottom Section */}
                <View style={globalStyles.bottom}>
                    <SubmitButton title="CONTINUE" onPress={handleNext} disabled={!isFormValid} />

                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={globalStyles.footer}>
                            Already have an account? <Text style={globalStyles.link}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}


