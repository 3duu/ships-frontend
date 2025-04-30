import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from 'react-native';
import { router } from 'expo-router';
import DynamicButton from '@/components/DynamicButton';
import AuthTextInput from '@/components/Auth/AuthTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useRegister} from "@/app/register/RegisterContext";
import {globalStyles} from "@/app/design/globalStyles";
import {registerAccount} from "@/app/(tabs)/api/auth";
import { handleApiError } from '@/app/utils/errors';


export default function StepAccount({ onNext }: Readonly<{ onNext: () => void }>) {
    const { dispatch } = useRegister();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isFormValid = name && isValidEmail(email) && password;

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
            handleApiError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingTop: 48,
                        flexGrow: 1,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
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
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <AuthTextInput
                        icon="lock-outline"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secure={!showPassword}
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
                </ScrollView>

                <View style={globalStyles.bottomContainer}>
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

        </SafeAreaView>

    );
}
