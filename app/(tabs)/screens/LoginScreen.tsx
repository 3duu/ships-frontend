import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    illustration: {
        width: '100%',
        height: 180,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
