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
       /* try {
            const res = await register(name, email, password);
            await login(email, password); // immediately log in
            onNext();
        } catch (err) {
            Alert.alert('Error', 'Registration failed');
        }*/

        if (!name || !email || !password) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        try {
            const res = await register(name, email, password); // your register API call
            await login(email, password); // auto-login after register
            onNext(); // move to next step
        } catch (err: any) {
            console.error('Registration failed:', err);

            let message = 'Something went wrong. Please try again.';

            if (err.response && err.response.data && err.response.data.error) {
                // if backend sends proper { "error": "message" }
                message = err.response.data.error;
            }

            Alert.alert('Registration Error', message);
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
