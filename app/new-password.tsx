import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPasswordScreen() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleResetPassword = () => {
        // Mock password reset logic
        router.push('/password-changed');
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
                            Reset Password
                        </Text>
                        <Text className="text-gray-400 text-base">
                            Enter your new password below.
                        </Text>
                    </View>

                    <View className="gap-5">
                        {/* Password Input */}
                        <View className="gap-2">
                            <Text className="text-white text-base font-medium ml-1">New Password</Text>
                            <View className="flex-row items-center bg-[#1A1A1A] rounded-2xl px-4 py-4 border border-white/5 focus:border-primary/50">
                                <View className="flex-row items-center gap-3 flex-1">
                                    <Lock size={20} color="#666" />
                                    <TextInput
                                        className="flex-1 text-white text-base font-medium"
                                        placeholder="Enter new password"
                                        placeholderTextColor="#666"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff size={20} color="#666" />
                                    ) : (
                                        <Eye size={20} color="#666" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password Input */}
                        <View className="gap-2">
                            <Text className="text-white text-base font-medium ml-1">Confirm Password</Text>
                            <View className="flex-row items-center bg-[#1A1A1A] rounded-2xl px-4 py-4 border border-white/5 focus:border-primary/50">
                                <View className="flex-row items-center gap-3 flex-1">
                                    <Lock size={20} color="#666" />
                                    <TextInput
                                        className="flex-1 text-white text-base font-medium"
                                        placeholder="Confirm new password"
                                        placeholderTextColor="#666"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} color="#666" />
                                    ) : (
                                        <Eye size={20} color="#666" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-white/10 py-4 rounded-full items-center active:bg-white/20 border border-white/5 mt-4"
                            onPress={handleResetPassword}
                        >
                            <Text className="text-white text-lg font-semibold">Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
