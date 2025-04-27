import {TouchableOpacity, TouchableOpacityProps, Text} from "react-native";
import {globalStyles} from "@/app/design/globalStyles";
import {theme} from "@/app/design/theme";

interface Props extends TouchableOpacityProps {
    title: string;
    disabled?: boolean;
}

export default function SubmitButton({ title, disabled, style, ...props }: Props) {
    return (
        <TouchableOpacity
            style={[
                globalStyles.button,
                disabled && { backgroundColor: theme.colors.orange}, // gray out if disabled
                style,
            ]}
            disabled={disabled}
            {...props}
        >
            <Text style={globalStyles.text}>{title}</Text>
        </TouchableOpacity>
    );
}