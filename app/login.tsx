import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from "react-native-webview/lib/WebView.styles";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleLogin = () => {
        console.log('Login with:', email, password);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#1f45ef',
            alignItems: 'center',
            padding: 20,
            paddingTop: 60,
        },
        illustration: {
            width: '100%',
            height: 180,
            marginBottom: 20,
        },
        // ... rest of your styles
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/login-illustration.png')} // replace with your illustration
                style={styles.illustration}
                resizeMode="contain"
            />

            <Text style={styles.title}>LOGIN</Text>

            {/* Email */}
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email-outline" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {/* Remember + Forgot Password */}
            <View style={styles.row}>
                <View style={styles.rememberRow}>
                    <Switch value={remember} onValueChange={setRemember} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            {/* OR section */}
            <Text style={styles.or}>OR</Text>
            <Text style={styles.socialText}>Log in with</Text>

            <View style={styles.socials}>
                <FontAwesome name="google" size={32} />
                <FontAwesome name="apple" size={32} />
                <FontAwesome name="facebook" size={32} />
            </View>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.register}>
                    Don't have an account? <Text style={styles.link}>Register now</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
