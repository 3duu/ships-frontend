import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/app/(tabs)/auth/AuthContext';

export default function HomeScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Ships 💘</Text>
            <Button title="Log Out" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 22, marginBottom: 20 },
});
