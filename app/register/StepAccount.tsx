import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StyleSheet,
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


export default function StepAccount({ onNext }: { onNext: () => void }) {
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
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.wrapper}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.wrapper}>
                    {/* Scrollable form area */}
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
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

                    {/* Fixed bottom button area */}
                    <View style={styles.bottomContainer}>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'transparent', // or use ImageBackground behind it
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        flexGrow: 1,
    },
    bottomContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        paddingTop: 12,
        backgroundColor: 'transparent',
    },
});
