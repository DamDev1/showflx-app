import { ArrowRight, ExternalLink, List } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onActionPress?: () => void;
    icon?: 'list' | 'arrow' | 'link';
}

export default function SectionHeader({
    title,
    subtitle,
    actionLabel,
    onActionPress,
    icon = 'arrow'
}: SectionHeaderProps) {
    return (
        <View className="flex-row items-end justify-between mb-4 px-4">
            <View>
                <Text className="text-xl font-bold text-black">{title}</Text>
                {subtitle && (
                    <Text className="text-gray-500 text-xs font-medium mt-0.5">{subtitle}</Text>
                )}
            </View>

            {actionLabel && (
                <TouchableOpacity
                    onPress={onActionPress}
                    className="flex-row items-center bg-white border border-gray-100 px-3 py-1.5 rounded-full active:bg-gray-50"
                >
                    {icon === 'list' && <List size={14} color="#333" strokeWidth={2.5} className="mr-1.5" />}
                    {icon === 'link' && <ExternalLink size={14} color="#333" strokeWidth={2.5} className="mr-1.5" />}
                    <Text className="text-xs font-semibold text-gray-800">{actionLabel}</Text>
                    {icon === 'arrow' && <ArrowRight size={14} color="#333" strokeWidth={2.5} className="ml-1.5" />}
                </TouchableOpacity>
            )}
        </View>
    );
}
