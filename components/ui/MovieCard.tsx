import { LinearGradient } from 'expo-linear-gradient';
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
    style,
}: MovieCardProps & { style?: any }) {
    if (variant === "highlight") {
        return (
            <TouchableOpacity onPress={onPress} className="mr-5 w-[280px]">
                <View className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-card">
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
                                        <Text className="text-xs font-bold text-black ml-1">{rating}</Text>
                                    </View>
                                )}
                                {tags.map(tag => (
                                    <View key={tag} className="bg-card px-2 py-0.5 rounded border border-border">
                                        <Text className="text-xs text-secondary">{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View className="h-10 w-8 rounded-lg overflow-hidden bg-card">
                        <Image source={{ uri: imageUrl }} className="w-full h-full opacity-60" blurRadius={5} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (variant === "compact") {
        return (
            <TouchableOpacity onPress={onPress} className="mr-4 w-[140px]" style={style}>
                <View className="h-[210px] w-full rounded-[18px] overflow-hidden relative bg-card shadow-sm">
                    <LinearGradient
                        colors={['#4f44ef7d', '#d044ef88']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="w-full h-full p-[2px] rounded-[18px]"
                    >
                        <View className="p-0.5">
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full rounded-[16px]"
                                resizeMode="cover"
                            />
                        </View>
                    </LinearGradient>

                    <View className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border border-white/30">
                        <Play size={15} color="white" fill="white" className="ml-0.5" />
                    </View>

                    {progress !== undefined && (
                        <View className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                            <View className="h-full bg-red-500" style={{ width: `${progress * 100}%` as any }} />
                        </View>
                    )}
                </View>
                <Text className="text-sm font-bold text-primary mt-3 ml-1" numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} className="w-full mb-4">
            <Text>Default Card</Text>
        </TouchableOpacity>
    );
}
