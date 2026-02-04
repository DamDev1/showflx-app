import { Bell, Menu } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    return (
        <View className="flex-row items-center justify-between py-2">
            {/* Left: Avatar + Info */}
            <View className="flex-row items-center gap-3">
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60' }}
                    className="w-10 h-10 rounded-full bg-gray-200"
                />
                <View>
                    <Text className="text-base font-bold text-black leading-tight">Tyrese</Text>
                    <Text className="text-xs text-gray-500 font-medium">Free plan</Text>
                </View>
            </View>

            {/* Right: Actions */}
            <View className="flex-row items-center gap-3">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100 shadow-sm active:bg-gray-50">
                    <Bell size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100 shadow-sm active:bg-gray-50">
                    <Menu size={20} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
}