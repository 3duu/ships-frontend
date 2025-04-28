import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {globalStyles} from "@/app/design/globalStyles";
import {theme} from "@/app/design/theme";

interface Props {
    step: number;
    totalSteps: number;
}

export default function StepIndicator({ step, totalSteps }: Props) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    return {
                        width: withTiming(index === step ? 16 : 10, { duration: 300 }),
                        height: withTiming(index === step ? 16 : 10, { duration: 300 }),
                        backgroundColor: index === step ? theme.colors.primary : theme.colors.gray,
                    };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[globalStyles.dot, animatedStyle]}
                    />
                );
            })}
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
