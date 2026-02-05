import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        // Mock sending code logic
        router.push('/reset-otp');
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
                            Forgot Password
                        </Text>
                        <Text className="text-gray-400 text-base">
                            Enter your email address to reset your password.
                        </Text>
                    </View>

                    <View className="gap-5">
                        <View className="gap-2">
                            <Text className="text-white text-base font-medium ml-1">Email</Text>
                            <View className="flex-row items-center gap-3 bg-[#1A1A1A] rounded-2xl px-4 py-4 border border-white/5 focus:border-primary/50">
                                <Mail size={18} color="#666" />
                                <TextInput
                                    className="flex-1 items-center text-white text-base font-medium"
                                    placeholder="Enter your email"
                                    placeholderTextColor="#666"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-white/10 py-4 rounded-full items-center active:bg-white/20 border border-white/5 mt-2"
                            onPress={handleSendCode}
                        >
                            <Text className="text-white text-lg font-semibold">Send Code</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
