import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SocialLogins() {
    return (
        <>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.text}>Log in with</Text>
            <View style={styles.icons}>
                <FontAwesome name="google" size={32} />
                <FontAwesome name="apple" size={32} />
                <FontAwesome name="facebook" size={32} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    or: { color: '#fff', marginTop: 20 },
    text: { color: '#fff', marginTop: 8, marginBottom: 8 },
    icons: { flexDirection: 'row', gap: 20, marginBottom: 20 },
});
