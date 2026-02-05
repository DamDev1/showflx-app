import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Fingerprint, Lock, Shield, Smartphone } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecurityPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [biometricsEnabled, setBiometricsEnabled] = useState(true);
    const [rememberMe, setRememberMe] = useState(true);

    const handleSave = () => {
        // Logic to save password or settings
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/5 items-center justify-center active:bg-white/10"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-primary">Security</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>

                {/* Password Section */}
                <View className="mb-8">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Lock size={18} color="#9CA3AF" />
                        <Text className="text-secondary font-bold uppercase text-xs tracking-wider">Change Password</Text>
                    </View>

                    <View className="gap-4">
                        <View className="bg-card border border-white/10 rounded-2xl px-4 py-3">
                            <Text className="text-secondary text-xs mb-1">Current Password</Text>
                            <TextInput
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                className="text-primary text-base"
                                placeholder="••••••••"
                                placeholderTextColor="#666"
                                secureTextEntry
                            />
                        </View>

                        <View className="bg-card border border-white/10 rounded-2xl px-4 py-3">
                            <Text className="text-secondary text-xs mb-1">New Password</Text>
                            <TextInput
                                value={newPassword}
                                onChangeText={setNewPassword}
                                className="text-primary text-base"
                                placeholder="••••••••"
                                placeholderTextColor="#666"
                                secureTextEntry
                            />
                        </View>

                        <View className="bg-card border border-white/10 rounded-2xl px-4 py-3">
                            <Text className="text-secondary text-xs mb-1">Confirm New Password</Text>
                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                className="text-primary text-base"
                                placeholder="••••••••"
                                placeholderTextColor="#666"
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-primary/10 border border-primary/20 mt-4 py-3 rounded-xl items-center active:bg-primary/20"
                    >
                        <Text className="text-primary font-bold">Update Password</Text>
                    </TouchableOpacity>
                </View>

                {/* Authentication Options */}
                <View className="mb-8">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Shield size={18} color="#9CA3AF" />
                        <Text className="text-secondary font-bold uppercase text-xs tracking-wider">Authentication</Text>
                    </View>

                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        <View className="flex-row items-center justify-between py-4 border-b border-white/5">
                            <View className="flex-row items-center gap-3">
                                <Fingerprint size={20} color="#9CA3AF" />
                                <View>
                                    <Text className="text-base font-medium text-primary">Biometric ID</Text>
                                    <Text className="text-secondary text-xs">Use FaceID/TouchID to log in</Text>
                                </View>
                            </View>
                            <Switch
                                value={biometricsEnabled}
                                onValueChange={setBiometricsEnabled}
                                trackColor={{ false: "#767577", true: "#fff" }}
                                thumbColor={"#000"}
                            />
                        </View>

                        <View className="flex-row items-center justify-between py-4">
                            <View className="flex-row items-center gap-3">
                                <Check size={20} color="#9CA3AF" />
                                <View>
                                    <Text className="text-base font-medium text-primary">Remember Me</Text>
                                    <Text className="text-secondary text-xs">Stay logged in on this device</Text>
                                </View>
                            </View>
                            <Switch
                                value={rememberMe}
                                onValueChange={setRememberMe}
                                trackColor={{ false: "#767577", true: "#fff" }}
                                thumbColor={"#000"}
                            />
                        </View>
                    </View>
                </View>

                {/* Device Management */}
                <View className="mb-12">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Smartphone size={18} color="#9CA3AF" />
                        <Text className="text-secondary font-bold uppercase text-xs tracking-wider">Devices</Text>
                    </View>

                    <View className="bg-card rounded-2xl p-4 border border-white/5">
                        <View className="flex-row justify-between items-start mb-4">
                            <View>
                                <Text className="text-primary font-bold text-base">iPhone 15 Pro</Text>
                                <Text className="text-green-500 text-xs">Active now • San Francisco, CA</Text>
                            </View>
                            <Shield size={16} color="#22c55e" />
                        </View>

                        <View className="h-[1px] bg-white/5 my-2" />

                        <TouchableOpacity className="py-2 active:opacity-70">
                            <Text className="text-red-500 font-medium text-center">Log out of all other devices</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
