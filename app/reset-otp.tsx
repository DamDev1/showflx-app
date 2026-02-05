import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetOTPScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState('');

    const handleVerify = () => {
        // Validation logic
        if (otp.length === 4) {
            // Navigate to New Password screen
            router.push('/new-password');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    <View className="mt-4 mb-8">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10 mb-6"
                        >
                            <ChevronLeft size={24} color="white" />
                        </TouchableOpacity>

                        <Text className="text-white text-3xl font-bold tracking-tight mb-2">
                            Verify Email
                        </Text>
                        <Text className="text-gray-400 text-base">
                            Enter the 4-digit code sent to your email to reset your password.
                        </Text>
                    </View>

                    <View className="flex-1">
                        {/* OTP Input */}
                        <View className="flex-row justify-between mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <View
                                    key={index}
                                    className={`w-[70px] h-[70px] rounded-2xl items-center justify-center border ${otp.length === index
                                            ? 'border-primary bg-primary/10'
                                            : otp.length > index
                                                ? 'border-white/20 bg-[#1A1A1A]'
                                                : 'border-white/10 bg-[#1A1A1A]'
                                        }`}
                                >
                                    <Text className="text-white text-2xl font-bold">
                                        {otp[index] || ''}
                                    </Text>
                                </View>
                            ))}
                            {/* Hidden Input Overlay */}
                            <TextInput
                                className="absolute inset-0 opacity-0"
                                value={otp}
                                onChangeText={(text) => {
                                    if (text.length <= 4 && /^\d*$/.test(text)) {
                                        setOtp(text);
                                    }
                                }}
                                keyboardType="number-pad"
                                maxLength={4}
                                autoFocus
                            />
                        </View>

                        <TouchableOpacity
                            className="bg-white/10 py-4 rounded-full items-center active:bg-white/20 border border-white/5"
                            onPress={handleVerify}
                        >
                            <Text className="text-white text-lg font-semibold">Verify</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-400 text-base">Didn't receive code? </Text>
                            <TouchableOpacity>
                                <Text className="text-white font-semibold text-base">Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
