import { Play } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
    title: string;
    year?: string;
    duration?: string;
    rating?: string;
    tags?: string[];
    imageUrl: string;
    variant?: "highlight" | "poster" | "compact";
    progress?: number;
    onPress?: () => void;
}

export function MovieCard({
    title,
    year,
    duration,
    rating,
    tags,
    imageUrl,
    variant = "poster",
    progress,
    onPress,
}: MovieCardProps) {
    if (variant === "highlight") {
        return (
            <TouchableOpacity onPress={onPress} className="mr-4 w-[280px]">
                <View className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-gray-200">
                    <Image source={{ uri: imageUrl }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
                    {progress !== undefined && (
                        <View className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300/30">
                            <View className="h-full bg-yellow-400" style={{ width: `${progress * 100}%` as any }} />
                        </View>
                    )}
                </View>
                <View className="mt-3 flex-row justify-between items-start">
                    <View>
                        <Text className="text-lg font-bold text-primary" numberOfLines={1}>{title}</Text>
                        <Text className="text-secondary text-xs">{year} • {duration}</Text>

                        {tags && (
                            <View className="flex-row mt-2 gap-2">
                                {rating && (
                                    <View className="bg-yellow-400 px-1.5 py-0.5 rounded flex-row items-center">
                                        <Text className="text-xs font-bold text-black font-mono">IMDb</Text>
                                        <Text className="text-xs font-bold text-black ml-1">{rating}</Text>
                                    </View>
                                )}
                                {tags.map(tag => (
                                    <View key={tag} className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                        <Text className="text-xs text-secondary">{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View className="h-10 w-8 rounded-lg overflow-hidden bg-gray-200">
                        <Image source={{ uri: imageUrl }} className="w-full h-full opacity-60" blurRadius={5} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (variant === "compact") {
        return (
            <TouchableOpacity onPress={onPress} className="mr-3 w-[140px]">
                <View className="h-[200px] w-full rounded-3xl overflow-hidden relative bg-gray-200 border-2 border-transparent focus:border-purple-500">
                    <Image source={{ uri: imageUrl }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
                    {/* Play Button Overlay */}
                    <View className="absolute inset-0 bg-black/10 items-center justify-center">
                        <View className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center">
                            <Play size={16} color="white" fill="white" className="ml-0.5" />
                        </View>
                    </View>

                    {progress !== undefined && (
                        <View className="absolute bottom-4 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
                            <View className="h-full bg-green-400 rounded-full" style={{ width: `${progress * 100}%` as any }} />
                        </View>
                    )}
                </View>
                <Text className="text-sm font-semibold text-primary mt-2 ml-1" numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} className="w-full mb-4">
            <Text>Default Card</Text>
        </TouchableOpacity>
    );
}
