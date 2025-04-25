import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '@/app/(tabs)/api/auth';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';

export default function StepAccount({ onNext }: { onNext: () => void }) {
    const { login } = useAuth(); // to store token after register
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await register(name, email, password);
            await login(email, password); // immediately log in
            onNext();
        } catch (err) {
            Alert.alert('Error', 'Registration failed');
        }
    };

    return (
        <View>
            <Text>Name</Text>
            <TextInput value={name} onChangeText={setName} />
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Text>Password</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Continue" onPress={handleSubmit} />
        </View>
    );
}
