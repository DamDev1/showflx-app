import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyPage() {
    const router = useRouter();

    const Section = ({ title, content }: { title: string, content: string }) => (
        <View className="mb-6">
            <Text className="text-primary font-bold text-lg mb-2">{title}</Text>
            <Text className="text-secondary leading-6">{content}</Text>
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
                <Text className="text-lg font-bold text-primary">Privacy Policy</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-secondary mb-6">Last updated: February 2026</Text>

                <Section
                    title="1. Introduction"
                    content="Welcome to ShowFlx. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our application and tell you about your privacy rights and how the law protects you."
                />

                <Section
                    title="2. Data We Collect"
                    content="We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data, Contact Data, Technical Data, and Usage Data."
                />

                <Section
                    title="3. How We Use Your Data"
                    content="We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you."
                />

                <Section
                    title="4. Data Security"
                    content="We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed."
                />

                <Section
                    title="5. Contact Us"
                    content="If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@showflx.com."
                />

                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}
