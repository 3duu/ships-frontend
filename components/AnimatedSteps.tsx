import React from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
    children: React.ReactNode;
    step: number;
    currentStep: number;
}

export default function AnimatedStep({ children, step, currentStep }: Readonly<Props>) {
    const offset = React.useRef(new Animated.Value((step - currentStep) * width)).current;

    React.useEffect(() => {
        Animated.timing(offset, {
            toValue: (step - currentStep) * width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    const animatedStyle = {
        transform: [{ translateX: offset }],
    };

    return (
        <View style={styles.outerContainer}>
            <Animated.View style={[styles.innerContainer, animatedStyle]}>
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, // ✅ outer View controls height layout
        width: '100%',
    },
    innerContainer: {
        flex: 1, // ✅ inner Animated.View also flexes full
        width: '100%',
    },
});
