import React, { useState } from 'react';
import { View, Text } from 'react-native';
import StepAccount from './StepAccount';
import StepProfile from './StepProfile';
/*import StepLocation from './StepLocation';
import StepPhotos from './StepPhotos';*/
import {globalStyles} from "@/app/design/globalStyles";


/*export default function Register() {
    const [step, setStep] = useState(0);

    // You could also use useReducer or context to collect full user data across steps

    const handleRegister = () => {
        console.log('✅ Submit final profile to backend');
        // Call your API to submit full user profile + photos
    };

    return (
        <View>
            {step === 0 && <StepAccount onNext={() => setStep(1)} />}
            {step === 1 && (
                <StepProfile onNext={() => setStep(2)} onBack={() => setStep(0)} />
            )}
            {step === 2 && (
                <StepLocation onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
                <StepPhotos onSubmit={handleRegister} onBack={() => setStep(2)} />
            )}
            <Text>Register Screen</Text>
        </View>
    );
}*/

export default function RegisterScreen() {
    return (
        <View>
            <Text>Register Screen</Text>
        </View>
    );
}
