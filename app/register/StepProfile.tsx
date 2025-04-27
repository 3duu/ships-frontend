import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SubmitButton from '@/components/Auth/SubmitButton';

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function StepProfile({ onNext, onBack }: Props) {
    const [dob, setDob] = useState<Date>(new Date(2000, 0, 1));
    const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
    const [interestedIn, setInterestedIn] = useState<'male' | 'female' | 'both' | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleNext = () => {
        if (!dob || !gender || !interestedIn) return;
        console.log('Step 2 Data:', {
            birthdate: dob.toISOString(),
            gender,
            interestedIn,
        });

        // TODO: Save this data to registration state or context
        onNext();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.wrapper}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Tell us about you</Text>

                <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                    <Text style={{ color: '#999' }}>Birthday: {dob.toDateString()}</Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="spinner"
                        onChange={(_, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) setDob(selectedDate);
                        }}
                    />
                )}

                <Text style={styles.label}>I am:</Text>
                <View style={styles.row}>
                    {['male', 'female', 'other'].map((g) => (
                        <TouchableOpacity
                            key={g}
                            onPress={() => setGender(g as any)}
                            style={[styles.option, gender === g && styles.selected]}
                        >
                            <Text>{g}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Interested in:</Text>
                <View style={styles.row}>
                    {['male', 'female', 'both'].map((g) => (
                        <TouchableOpacity
                            key={g}
                            onPress={() => setInterestedIn(g as any)}
                            style={[styles.option, interestedIn === g && styles.selected]}
                        >
                            <Text>{g}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottom}>
                <SubmitButton title="CONTINUE" onPress={handleNext} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        marginBottom: 8,
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    option: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    selected: {
        backgroundColor: '#dceeff',
        borderColor: '#1f45ef',
        borderWidth: 1,
    },
    bottom: {
        paddingHorizontal: 24,
        paddingBottom: 48,
        alignItems: 'center',
    },
});
