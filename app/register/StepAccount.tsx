import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import DynamicButton from "@/components/DynamicButton";
import { globalStyles } from "@/app/design/globalStyles";
import AuthTextInput from '@/components/Auth/AuthTextInput';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {useRegister} from "@/app/register/RegisterContext";
import {registerAccount} from "@/app/(tabs)/api/auth";

export default function StepAccount({ onNext }: { onNext: () => void }) {
    const { dispatch } = useRegister();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isFormValid = name.length > 0 && password.length > 0 && isValidEmail(email);

    const handleNextStep = async () => {
        if (!isFormValid) {
            Alert.alert('Validation Error', 'Please fill in all fields with valid information.');
            return;
        }

        try {
            setSubmitting(true);

            const response = await registerAccount(name, email, password);

            // Optional: Save the token if needed
            // await SecureStore.setItemAsync('authToken', response.token);

            dispatch({ type: 'SET_ACCOUNT_INFO', payload: { name, email, password } });

            onNext();
        } catch (err: any) {
            console.error('Registration error:', err.response?.data || err.message);

            let message = 'Something went wrong. Please try again.';
            if (err.response && err.response.data && err.response.data.error) {
                message = err.response.data.error;
            }

            Alert.alert('Registration Error', message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View>
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

            <View style={globalStyles.bottom}>
                <DynamicButton
                    title="Continue"
                    onPress={handleNextStep}
                    disabled={!isFormValid || submitting}
                    loading={submitting}
                />

                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={globalStyles.footer}>
                        Already have an account? <Text style={globalStyles.link}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
