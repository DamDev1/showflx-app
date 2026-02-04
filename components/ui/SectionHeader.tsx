import { ArrowRight, List } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    actionText?: string;
    actionIcon?: "list" | "arrow" | "showAll";
    onAction?: () => void;
}

export function SectionHeader({ title, subtitle, actionText, actionIcon, onAction }: SectionHeaderProps) {
    return (
        <View className="flex-row items-end justify-between px-6 mb-4">
            <View>
                <Text className="text-2xl font-bold text-primary">{title}</Text>
                {subtitle && <Text className="text-secondary text-sm mt-1">{subtitle}</Text>}
            </View>

            {actionText && (
                <TouchableOpacity
                    onPress={onAction}
                    className="flex-row items-center bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm"
                >
                    {actionIcon === "list" && <List size={14} color="#1A1A1A" className="mr-2" />}
                    {actionIcon === "showAll" && <ArrowRight size={14} color="#1A1A1A" className="transform -rotate-45 mr-2" />}

                    <Text className="text-xs font-semibold text-primary">{actionText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
