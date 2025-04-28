import React from 'react';
import { View, StyleSheet } from 'react-native';
import {globalStyles} from "@/app/design/globalStyles";

interface Props {
    step: number;
    totalSteps: number;
}

export default function StepIndicator({ step, totalSteps }: Props) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        globalStyles.dot,
                        index === step ? globalStyles.activeDot : globalStyles.inactiveDot,
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
});
