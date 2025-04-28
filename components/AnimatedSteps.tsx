import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native'; // ✅ use react-native Animated here!

const { width } = Dimensions.get('window');

interface Props {
    children: React.ReactNode;
    step: number;
    currentStep: number;
}

export default function AnimatedStep({ children, step, currentStep }: Props) {
    const offset = React.useRef(new Animated.Value((step - currentStep) * width)).current;

    React.useEffect(() => {
        Animated.timing(offset, {
            toValue: (step - currentStep) * width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: offset }] }]}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width,
        paddingHorizontal: 24,
    },
});
