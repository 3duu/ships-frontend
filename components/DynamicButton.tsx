import React from 'react';
import { TouchableOpacity, View, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '@/app/design/theme';
import {globalStyles} from "@/app/design/globalStyles"; // Your theme

interface Props extends TouchableOpacityProps {
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

export default function DynamicButton({ title, disabled = false, loading = false, style, ...props }: Readonly<Props>) {
    const backgroundColor = disabled ? theme.colors.gray : theme.colors.primary;

    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
            {...props}
        >
            <View style={[
                globalStyles.button,
                { backgroundColor },
                style,
            ]}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={globalStyles.text}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

