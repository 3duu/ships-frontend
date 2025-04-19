import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    onPress: () => void;
    title: string;
}

export default function SubmitButton({ onPress, title }: Props) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        color: '#1f45ef',
        fontWeight: 'bold',
    },
});
