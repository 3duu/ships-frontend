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

    const isActive = step === currentStep;

    return (
        <View style={[styles.wrapper, !isActive && styles.hidden]}>
            <Animated.View style={[styles.container, animatedStyle]}>
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
    },
    hidden: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Hides non-active steps from layout
    },
    container: {
        flex: 1,
        width: '100%',
    },
});
