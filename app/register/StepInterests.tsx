import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import Button from '@/components/Button';
import {useRegister} from "@/app/register/RegisterContext";
import {globalStyles} from "@/app/design/globalStyles";
import {fetchInterests} from "@/app/api/interests";


export default function StepInterests({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const { updateData } = useRegister();
    const [bio, setBio] = useState('');
    const [interests, setInterests] = useState<string[]>([]);

    const [availableInterests, setAvailableInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInterests = async () => {
            try {
                const data = await fetchInterests();
                setAvailableInterests(data);
            } catch (err) {
                console.error('Failed to load interests', err);
            } finally {
                setLoading(false);
            }
        };

        loadInterests();
    }, []);

    const toggleInterest = (interest: string) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const handleContinue = () => {
        updateData({ bio, interests });
        onNext();
    };

    const isFormValid = bio.trim().length > 0 && interests.length > 0;

    return (

        <SafeAreaView style={styles.container}>
            <View style={globalStyles.top}>
                <Text style={globalStyles.title}>Tell us about you</Text>

                <Text style={styles.label}>Short Bio</Text>
                <TextInput
                    style={globalStyles.input}
                    multiline
                    numberOfLines={3}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="A little about yourself..."
                />

                <Text style={[globalStyles.label, { marginTop: 20 }]}>Your Interests</Text>
                <View style={styles.interestsContainer}>
                    {availableInterests.map(interest => (
                        <TouchableOpacity
                            key={interest}
                            style={[
                                styles.interestTag,
                                interests.includes(interest) && styles.interestTagSelected,
                            ]}
                            onPress={() => toggleInterest(interest)}
                        >
                            <Text style={styles.interestText}>{interest}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={onBack} style={{ backgroundColor: '#ccc' }} />
                <Button title="Continue" onPress={handleContinue} disabled={!isFormValid} />
            </View>
        </SafeAreaView>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        backgroundColor: 'white',
        textAlignVertical: 'top',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    interestTag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
    },
    interestTagSelected: {
        backgroundColor: '#1f45ef',
        borderColor: '#1f45ef',
    },
    interestText: {
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
});
