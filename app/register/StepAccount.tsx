import React, { useState } from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import DynamicButton from "@/components/DynamicButton";
import {globalStyles} from "@/app/design/globalStyles";
import AuthTextInput from '@/components/Auth/AuthTextInput';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {router} from "expo-router";

export default function StepAccount({ onNext }: { onNext: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = name.length > 0 && email.length > 0 && password.length > 0;

    const handleNextStep = async () => {
        if (!isFormValid) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        try {
            setSubmitting(true); // 👈 Start submitting

            // Simulate an API call (you would call your backend here)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Move to next step
            onNext();
        } catch (err) {
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setSubmitting(false); // 👈 Stop submitting
        }
    };

    return (
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

            <DynamicButton
                title="Continue"
                onPress={handleNextStep}
                disabled={!isFormValid || submitting}
                loading={submitting}
            />

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={globalStyles.footer}>
                    Already have an account?{' '}
                    <Text style={globalStyles.link}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

