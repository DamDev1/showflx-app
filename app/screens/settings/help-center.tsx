import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQS = [
    {
        id: '1',
        question: 'How do I reset my password?',
        answer: 'You can reset your password by going to Settings > Security and tapping on "Change Password". If you are logged out, click "Forgot Password" on the login screen.'
    },
    {
        id: '2',
        question: 'Can I download movies for offline viewing?',
        answer: 'Yes, premium members can download movies. Look for the download icon next to the "Watch Now" button on any movie details page.'
    },
    {
        id: '3',
        question: 'How do I cancel my subscription?',
        answer: 'You can manage your subscription in Settings > Account > Subscription. You can cancel anytime before your next billing cycle.'
    },
    {
        id: '4',
        question: 'Is 4K streaming available',
        answer: '4K Ultra HD streaming is available for select titles and requires a Premium plan and a compatible device.'
    }
];

export default function HelpCenterPage() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
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
                <Text className="text-lg font-bold text-primary">Help Center</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-primary font-bold text-2xl mb-2">How can we help?</Text>
                <Text className="text-secondary mb-6">Search for answers or browse frequently asked questions.</Text>

                {/* Search Bar */}
                <View className="flex-row items-center bg-card border border-white/10 rounded-xl px-4 py-3 mb-8">
                    <Search size={20} color="#9CA3AF" className="mr-3" />
                    <TextInput
                        placeholder="Search for help..."
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 text-primary text-base"
                    />
                </View>

                {/* FAQs */}
                <Text className="text-primary font-bold text-lg mb-4">Frequently Asked Questions</Text>
                <View className="gap-3 mb-8">
                    {FAQS.map((faq) => {
                        const isExpanded = expandedId === faq.id;
                        return (
                            <TouchableOpacity
                                key={faq.id}
                                activeOpacity={0.8}
                                onPress={() => toggleExpand(faq.id)}
                                className={`bg-card border border-white/5 rounded-2xl overflow-hidden ${isExpanded ? 'border-primary/30' : ''}`}
                            >
                                <View className="flex-row items-center justify-between p-4">
                                    <Text className="text-base font-medium text-primary flex-1 mr-2">{faq.question}</Text>
                                    {isExpanded ? (
                                        <ChevronUp size={20} color="#FFFFFF" />
                                    ) : (
                                        <ChevronDown size={20} color="#9CA3AF" />
                                    )}
                                </View>
                                {isExpanded && (
                                    <View className="px-4 pb-4">
                                        <Text className="text-secondary leading-5">{faq.answer}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Contact Support */}
                <View className="bg-blue-500/10 rounded-2xl p-6 items-center mb-12 border border-blue-500/20">
                    <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mb-4 shadow-lg">
                        <MessageCircle size={24} color="#FFFFFF" />
                    </View>
                    <Text className="text-primary font-bold text-lg mb-2">Still need help?</Text>
                    <Text className="text-secondary text-center mb-6">Our support team is available 24/7 to assist you with any issues.</Text>
                    <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-full shadow-md active:bg-blue-600">
                        <Text className="text-white font-bold">Contact Support</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
