import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { theme } from '@/app/design/theme';

interface Props extends TouchableOpacityProps {
    title: string;
}

export default function Button({ title, style, ...props }: Props) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: 30,
        alignItems: 'center',
    },
    text: {
        color: theme.colors.white,
        fontWeight: '600',
        fontSize: theme.typography.fontSize.md,
    },
});
