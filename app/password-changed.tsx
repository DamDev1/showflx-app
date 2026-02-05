import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordChangedScreen() {
    const router = useRouter();

    const handleBackToLogin = () => {
        router.replace('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#050505] items-center justify-center px-6">
            <StatusBar style="light" />

            <View className="items-center w-full">
                <View className="w-24 h-24 rounded-full bg-green-500/20 items-center justify-center mb-8 border border-green-500/50">
                    <Check size={48} color="#4ade80" />
                </View>

                <Text className="text-white text-3xl font-bold tracking-tight mb-4 text-center">
                    Password Changed!
                </Text>

                <Text className="text-gray-400 text-base text-center mb-12 leading-6">
                    Your password has been changed successfully. You can now login with your new password.
                </Text>

                <TouchableOpacity
                    className="w-full bg-white/10 py-4 rounded-full items-center active:bg-white/20 border border-white/5"
                    onPress={handleBackToLogin}
                >
                    <Text className="text-white text-lg font-semibold">Back to Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
