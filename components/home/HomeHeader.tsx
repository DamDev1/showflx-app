import { Bell, Menu } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function HomeHeader() {
    return (
        <View className="flex-row items-center justify-between px-6 py-4">
            <View className="flex-row items-center space-x-3">
                <View className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    {/* Placeholder for Avatar */}
                    <Image
                        source={{ uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }}
                        className="h-full w-full"
                    />
                </View>
                <View>
                    <Text className="text-primary font-bold text-base">Tyrese</Text>
                    <Text className="text-secondary text-xs">Free plan</Text>
                </View>
            </View>

            <View className="flex-row items-center space-x-3 gap-3">
                <TouchableOpacity className="p-2 rounded-full bg-white border border-gray-100 shadow-sm">
                    <Bell size={20} color="#8E8E93" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 rounded-full bg-white border border-gray-100 shadow-sm">
                    <Menu size={20} color="#8E8E93" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
