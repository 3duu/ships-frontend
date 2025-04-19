import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props extends TextInputProps {
    icon: string;
    secure?: boolean;
    rightIcon?: JSX.Element;
}

export default function AuthTextInput({ icon, secure, rightIcon, ...rest }: Props) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />
            <TextInput style={styles.input} secureTextEntry={secure} {...rest} />
            {rightIcon}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 10,
        width: '100%',
        height: 50,
    },
    input: { flex: 1, marginLeft: 8 },
    icon: { color: '#999' },
});
