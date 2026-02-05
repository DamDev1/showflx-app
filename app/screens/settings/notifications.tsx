import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Smartphone, Star, Tag, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationSettingsPage() {
    const router = useRouter();
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [newArrivals, setNewArrivals] = useState(true);
    const [recommendations, setRecommendations] = useState(true);
    const [offers, setOffers] = useState(false);

    const ToggleItem = ({ icon, label, description, value, onValueChange, disabled = false }: { icon: React.ReactNode, label: string, description?: string, value: boolean, onValueChange: (val: boolean) => void, disabled?: boolean }) => (
        <View className={`flex-row items-center justify-between py-4 border-b border-white/5 ${disabled ? 'opacity-50' : ''}`}>
            <View className="flex-row items-center gap-3 flex-1 pr-4">
                {icon}
                <View className="flex-1">
                    <Text className="text-base font-medium text-primary">{label}</Text>
                    {description && <Text className="text-secondary text-xs">{description}</Text>}
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#767577", true: "#fff" }}
                thumbColor={"#000"}
                disabled={disabled}
            />
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
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

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>

                <View className="mb-8">
                    <Text className="text-secondary font-bold uppercase text-xs tracking-wider mb-2 ml-1">Push Notifications</Text>
                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        <ToggleItem
                            icon={<Smartphone size={20} color="#9CA3AF" />}
                            label="Allow Push Notifications"
                            value={pushEnabled}
                            onValueChange={setPushEnabled}
                        />
                        <ToggleItem
                            icon={<Zap size={20} color="#9CA3AF" />}
                            label="New Arrivals"
                            description="Get notified when new movies and shows drop"
                            value={newArrivals}
                            onValueChange={setNewArrivals}
                            disabled={!pushEnabled}
                        />
                        <ToggleItem
                            icon={<Star size={20} color="#9CA3AF" />}
                            label="Recommendations"
                            description="Movies we think you'll love"
                            value={recommendations}
                            onValueChange={setRecommendations}
                            disabled={!pushEnabled}
                        />
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-secondary font-bold uppercase text-xs tracking-wider mb-2 ml-1">Email Notifications</Text>
                    <View className="bg-card rounded-2xl px-4 border border-white/5 overflow-hidden">
                        <ToggleItem
                            icon={<Mail size={20} color="#9CA3AF" />}
                            label="Allow Email Notifications"
                            value={emailEnabled}
                            onValueChange={setEmailEnabled}
                        />
                        <ToggleItem
                            icon={<Tag size={20} color="#9CA3AF" />}
                            label="Special Offers"
                            description="Discounts and promotions"
                            value={offers}
                            onValueChange={setOffers}
                            disabled={!emailEnabled}
                        />
                    </View>
                </View>

                <Text className="text-secondary text-xs px-2 text-center">
                    You can also manage system-level notification permissions in your device settings.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}
