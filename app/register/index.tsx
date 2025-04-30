import React, { useState } from 'react';
import StepAccount from './StepAccount';
import StepProfile from './StepProfile';
/*import StepLocation from './StepLocation';
import StepPhotos from './StepPhotos';*/
import StepIndicator from '@/components/StepIndicator';
import { View, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { globalStyles } from "@/app/design/globalStyles";
import {RegisterProvider} from "@/app/register/RegisterContext";
import AnimatedStep from '../../components/AnimatedSteps';

export default function RegisterScreen() {
    const [step, setStep] = useState(0);

    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

    return (
        <RegisterProvider>
            <ImageBackground
                source={require('../../assets/images/register-bg.png')}
                style={globalStyles.bg}
                resizeMode="cover"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={globalStyles.overlay}
                >

                {/* Move StepIndicator here */}
                <View style={globalStyles.stepIndicatorContainer}>
                    <StepIndicator step={step} totalSteps={4} />
                </View>

               <AnimatedStep step={0} currentStep={step}>
                   <StepAccount onNext={handleNext} />
               </AnimatedStep>

               <AnimatedStep step={1} currentStep={step}>
                   <StepProfile onNext={handleNext} onBack={handleBack} />
               </AnimatedStep>

                </KeyboardAvoidingView>
            </ImageBackground>
        </RegisterProvider>
    );
}

