import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    value: boolean;
    onToggle: (v: boolean) => void;
}

export default function RememberMeRow({ value, onToggle }: Props) {
    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <Switch value={value} onValueChange={onToggle} />
                <Text style={styles.text}>Remember Me</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        marginLeft: 5,
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
});
