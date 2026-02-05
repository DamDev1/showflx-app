import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, PlayCircle, Star } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'New Arrival',
        message: 'Dune: Part Two is now available to stream.',
        time: '2 hours ago',
        type: 'arrival',
        read: false,
    },
    {
        id: '2',
        title: 'Recommendation',
        message: 'Because you watched "Inception", you might like "Interstellar".',
        time: '5 hours ago',
        type: 'recommendation',
        read: true,
    },
    {
        id: '3',
        title: 'Subscription',
        message: 'Your premium subscription has been successfully renewed.',
        time: '1 day ago',
        type: 'system',
        read: true,
    },
    {
        id: '4',
        title: 'System Update',
        message: 'We have updated our terms of service.',
        time: '3 days ago',
        type: 'system',
        read: true,
    },
];

export default function NotificationsPage() {
    const router = useRouter();

    const getIcon = (type: string) => {
        switch (type) {
            case 'arrival':
                return <PlayCircle size={20} color="#FFFFFF" />;
            case 'recommendation':
                return <Star size={20} color="#FFFFFF" />;
            default:
                return <Bell size={20} color="#FFFFFF" />;
        }
    };

    const getIconBg = (type: string) => {
        switch (type) {
            case 'arrival':
                return 'bg-blue-500';
            case 'recommendation':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        <TouchableOpacity className={`flex-row items-start p-4 border-b border-white/5 ${!item.read ? 'bg-white/5' : 'bg-transparent'}`}>
            <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${getIconBg(item.type)}`}>
                {getIcon(item.type)}
            </View>
            <View className="flex-1">
                <View className="flex-row justify-between mb-1">
                    <Text className="text-primary font-bold text-base">{item.title}</Text>
                    <Text className="text-secondary text-xs">{item.time}</Text>
                </View>
                <Text className="text-secondary leading-5">{item.message}</Text>
            </View>
            {!item.read && (
                <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 ml-2" />
            )}
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
                <Text className="text-lg font-bold text-primary">Notifications</Text>
                <View className="w-10" />
            </View>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center pt-20">
                        <Bell size={48} color="#666" />
                        <Text className="text-secondary mt-4">No notifications yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
