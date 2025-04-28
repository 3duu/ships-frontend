import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import {globalStyles} from "@/app/design/globalStyles"; // Your theme

interface Props extends TouchableOpacityProps {
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button({ title, style, ...props }: Readonly<Props>) {
    return (
        <TouchableOpacity style={[globalStyles.button, style]} {...props}>
            <Text style={globalStyles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

