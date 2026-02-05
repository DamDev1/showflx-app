import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, ChevronRight, CreditCard, FileText, Globe, HelpCircle, Lock, LogOut, Moon, Shield, User } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsPage() {
    const router = useRouter();

    const renderSettingItem = (icon: React.ReactNode, label: string, value?: string, showArrow = true, isDestructive = false) => (
        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-white/5 active:bg-white/5 px-4 -mx-4">
            <View className="flex-row items-center gap-3">
                {icon}
                <Text className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-primary'}`}>
                    {label}
                </Text>
            </View>
            <View className="flex-row items-center gap-2">
                {value && <Text className="text-secondary text-sm">{value}</Text>}
                {showArrow && <ChevronRight size={16} color="#666" />}
            </View>
        </TouchableOpacity>
    );

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
                <Text className="text-lg font-bold text-primary">Settings</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View className="items-center py-8">
                    <View className="relative">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60' }}
                            className="w-24 h-24 rounded-full bg-white/10"
                        />
                        <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 items-center justify-center border-2 border-background">
                            <User size={14} color="white" />
                        </View>
                    </View>
                    <Text className="text-xl font-bold text-primary mt-4">Tyrese</Text>
                    <Text className="text-secondary">tyrese@example.com</Text>
                    <View className="mt-4 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/50">
                        <Text className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Premium Member</Text>
                    </View>
                </View>

                {/* Account Settings */}
                <View className="mb-6">
                    <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">Account</Text>
                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        {renderSettingItem(<User size={20} color="#9CA3AF" />, "Edit Profile")}
                        {renderSettingItem(<Lock size={20} color="#9CA3AF" />, "Security")}
                        {renderSettingItem(<CreditCard size={20} color="#9CA3AF" />, "Payment Methods", "Visa **4242")}
                        {renderSettingItem(<Bell size={20} color="#9CA3AF" />, "Notifications")}
                    </View>
                </View>

                {/* App Settings */}
                <View className="mb-6">
                    <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">Preferences</Text>
                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        {renderSettingItem(<Globe size={20} color="#9CA3AF" />, "Language", "English")}
                        <View className="flex-row items-center justify-between py-4 border-b border-white/5 -mx-4 px-4">
                            <View className="flex-row items-center gap-3">
                                <Moon size={20} color="#9CA3AF" />
                                <Text className="text-base font-medium text-primary">Dark Mode</Text>
                            </View>
                            <Switch value={true} trackColor={{ false: "#767577", true: "#fff" }} thumbColor={"#000"} />
                        </View>
                        {renderSettingItem(<Shield size={20} color="#9CA3AF" />, "Privacy Policy")}
                    </View>
                </View>

                {/* Support */}
                <View className="mb-8">
                    <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">Support</Text>
                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        {renderSettingItem(<HelpCircle size={20} color="#9CA3AF" />, "Help Center")}
                        {renderSettingItem(<FileText size={20} color="#9CA3AF" />, "Terms of Service")}
                        <TouchableOpacity
                            className="flex-row items-center justify-between py-4 -mx-4 px-4 active:bg-red-500/10"
                            onPress={() => router.replace('/login')}
                        >
                            <View className="flex-row items-center gap-3">
                                <LogOut size={20} color="#EF4444" />
                                <Text className="text-base font-medium text-red-500">Log Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-secondary text-xs text-center mb-8">Version 1.0.0 (Build 124)</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
