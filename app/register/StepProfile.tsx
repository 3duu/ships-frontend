import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '@/app/design/globalStyles';
import DynamicButton from '@/components/DynamicButton';
import {useRegister} from "@/app/register/RegisterContext";

interface StepProfileProps {
    onNext: () => void;
    onBack: () => void;
}

export default function StepProfile({ onNext, onBack }: StepProfileProps) {
    const { dispatch } = useRegister();

    const [dob, setDob] = useState<Date>(new Date(2000, 0, 1));
    const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
    const [interestedIn, setInterestedIn] = useState<'male' | 'female' | 'both' | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isFormValid = dob && gender && interestedIn;

    const handleNextStep = () => {
        if (!isFormValid) return;

        dispatch({
            type: 'SET_PROFILE_INFO',
            payload: {
                birthdate: dob.toISOString(),
                gender,
                interestedIn,
            },
        });

        onNext();
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Tell us about yourself</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={globalStyles.dateButton}>
                <Text style={globalStyles.dateButtonText}>
                    {dob ? dob.toDateString() : 'Select your birthday'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={dob}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDob(selectedDate);
                    }}
                />
            )}

            <Text style={globalStyles.label}>I am:</Text>
            <View style={globalStyles.row}>
                {['male', 'female', 'other'].map((g) => (
                    <TouchableOpacity
                        key={g}
                        onPress={() => setGender(g as any)}
                        style={[globalStyles.option, gender === g && globalStyles.optionSelected]}
                    >
                        <Text>{g}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={globalStyles.label}>Interested in:</Text>
            <View style={globalStyles.row}>
                {['male', 'female', 'both'].map((g) => (
                    <TouchableOpacity
                        key={g}
                        onPress={() => setInterestedIn(g as any)}
                        style={[globalStyles.option, interestedIn === g && globalStyles.optionSelected]}
                    >
                        <Text>{g}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={globalStyles.bottom}>
                <DynamicButton title="Continue" onPress={handleNextStep} disabled={!isFormValid} />

                <TouchableOpacity onPress={onBack}>
                    <Text style={globalStyles.footer}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


