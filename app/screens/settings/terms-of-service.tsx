import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsOfServicePage() {
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
                <Text className="text-lg font-bold text-primary">Terms of Service</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-secondary mb-6">Last updated: February 2026</Text>

                <Section
                    title="1. Acceptance of Terms"
                    content="By accessing and using ShowFlx, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
                />

                <Section
                    title="2. Use License"
                    content="Permission is granted to temporarily download one copy of the materials (information or software) on ShowFlx's application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
                />

                <Section
                    title="3. User Account"
                    content="To access certain features of the App, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
                />

                <Section
                    title="4. Content Policy"
                    content="You agree not to use the App to distribute, upload, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or libellous."
                />

                <Section
                    title="5. Termination"
                    content="We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
                />

                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}
