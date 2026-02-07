import { setCredentials } from '@/slices/authSlice';
import { useLoginMutation } from '@/slices/userApiSlice';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useErrorHandler } from './hooks/useErrorHandler';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading }] = useLoginMutation()
    const handleError = useErrorHandler();

    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                userInfo: res.user,
                token: res.accessToken,
                refreshToken: res.refreshToken
            }));

            Toast.show({
                type: 'success',
                text1: 'Welcome back!',
                text2: 'You have successfully logged in.',
            });

            router.replace('/(tabs)');

        } catch (error: any) {
            handleError(error);
            if (error.data?.message === 'Please verify your email first' || error.data?.message?.message === 'Please verify your email first') {
                router.push({
                    pathname: '/otp',
                    params: {
                        email: email
                    }
                });
            }
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
                            Login to ShowFlx
                        </Text>
                        <Text className="text-gray-400 text-base">
                            Please enter your details.
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

                        <View className="gap-2">
                            <Text className="text-white text-base font-medium ml-1">Password</Text>
                            <View className="flex-row items-center bg-[#1A1A1A] rounded-2xl px-4 py-4 border border-white/5 focus:border-primary/50">
                                <View className="flex-row items-center gap-3 flex-1">
                                    <Lock size={20} color="#666" />
                                    <TextInput
                                        className="flex-1 text-white text-base font-medium"
                                        placeholder="Enter your password"
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

                        <TouchableOpacity className="self-start" onPress={() => router.push('/forgot-password')}>
                            <Text className="text-gray-400 underline decoration-gray-400">
                                Forget Password
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white/10 py-4 rounded-full items-center active:bg-white/20 border border-white/5 mt-2"
                            onPress={handleLogin}
                        >

                            {isLoading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white text-lg font-semibold">Login</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View className="h-10" />

                    <View className="gap-4">
                        <TouchableOpacity className="flex-row items-center justify-center bg-[#1A1A1A] py-4 rounded-2xl border border-white/5 gap-3">
                            <Text className="text-white font-bold text-lg">G</Text>
                            <Text className="text-white font-medium text-base">Login with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-center bg-[#1A1A1A] py-4 rounded-2xl border border-white/5 gap-3">
                            <Text className="text-white font-bold text-lg"></Text>
                            <Text className="text-white font-medium text-base">Login with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-1 justify-end pb-8 mt-8">
                        <View className="flex-row justify-center space-x-1">
                            <Text className="text-gray-400 text-base">New user?</Text>
                            <TouchableOpacity onPress={() => router.push('/signup')}>
                                <Text className="text-white font-semibold text-base">Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}