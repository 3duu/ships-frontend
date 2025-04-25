import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {globalStyles} from '../design/globalStyles';

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function StepProfile({ onNext, onBack }: Props) {
    const [dob, setDob] = useState<Date | undefined>(new Date(2000, 0, 1));
    const [showPicker, setShowPicker] = useState(false);

    const [gender, setGender] = useState<'male' | 'female' | 'other'>();
    const [interestedIn, setInterestedIn] = useState<'male' | 'female' | 'both'>();

    const handleNext = () => {
        if (!dob || !gender || !interestedIn) return;
        console.log({
            birthdate: dob.toISOString(),
            gender,
            interestedIn,
        });

        // TODO: save to context or form reducer
        onNext();
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Profile Info</Text>

            <TouchableOpacity onPress={() => setShowPicker(true)} style={globalStyles.input}>
                <Text>Select Date of Birth: {dob?.toDateString()}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={dob || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(_, selectedDate) => {
                        setShowPicker(false);
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
                        style={[
                            globalStyles.option,
                            gender === g && globalStyles.selected,
                        ]}
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
                        style={[
                            globalStyles.option,
                            interestedIn === g && globalStyles.selected,
                        ]}
                    >
                        <Text>{g}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={globalStyles.footer}>
                <Button title="Back" onPress={onBack} />
                <Button title="Continue" onPress={handleNext} />
            </View>
        </View>
    );
}
