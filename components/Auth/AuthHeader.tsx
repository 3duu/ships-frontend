import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function AuthHeader() {
    return (
        <View style={styles.container}>
            {/*<Image
                source={require('../../assets/images/login-illustration.png')}
                style={styles.image}
                resizeMode="contain"
            />*/}
            <Text style={styles.title}>LOGIN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 20 },
    image: { width: '100%', height: 180 },
    title: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginTop: 10 },
});