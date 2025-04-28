import React, { useState } from 'react';
import StepAccount from './StepAccount';
import StepProfile from './StepProfile';
import StepLocation from './StepLocation';
import StepPhotos from './StepPhotos';
import {globalStyles} from "@/app/design/globalStyles";

import {
    View,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';



export default function RegisterScreen() {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    return (

        <ImageBackground
            source={require('../../assets/images/register-bg.png')}
            style={globalStyles.bg}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={globalStyles.overlay}
            >

                <View style={globalStyles.container}>
                    {step === 0 && <StepAccount onNext={handleNext} />}
                    {step === 1 && <StepProfile onNext={handleNext} onBack={handleBack} />}
                    {step === 2 && <StepLocation onNext={handleNext} onBack={handleBack} />}
                    {step === 3 && <StepPhotos onBack={handleBack} />}
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}


