import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { Bell, Menu } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Header() {
    const router = useRouter();
    const userInfo = useSelector((state:any) => state.auth.userInfo);
    return (
        <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-3">
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60' }}
                    className="w-10 h-10 rounded-full bg-white/20"
                />
                <View>
                    <Text className="text-base font-bold text-primary leading-tight">{userInfo?.fullName}</Text>
                    <Text className="text-xs text-secondary font-medium capitalize">{userInfo?.subscriptionStatus} plan</Text>
                </View>
            </View>

            <View className="flex-row items-center gap-3">
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/5 shadow-sm active:bg-white/20"
                    onPress={() => router.push('/screens/notifications/notifications')}
                >
                    <Bell size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/5 shadow-sm active:bg-white/20"
                    onPress={() => router.push('/screens/settings/settings')}
                >
                    <Menu size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}