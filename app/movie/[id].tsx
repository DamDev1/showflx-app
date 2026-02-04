import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Bookmark, Check, ChevronLeft, Info, Maximize2, Share, ThumbsDown } from "lucide-react-native";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

// Mock data integration would go here
const MOVIE = {
    title: "Blade Runner 2049",
    year: "2017",
    duration: "2h 43m",
    posterUrl: "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    description: "Rick Deckard, an ex-policeman, becomes a special agent with a mission to exterminate a group of violent androids. As he starts getting deeper into his mission.",
    ratings: {
        imdb: "8.0",
        amazon: "4.6",
        rt: "89%"
    },
    media: [
        "https://image.tmdb.org/t/p/w500/mwL3IIPY6DqT59H0sC9W5W8s9vQ.jpg",
        "https://image.tmdb.org/t/p/w500/sAtoqnRLUTIgk72BbmWp8yX97bM.jpg",
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    ]
};

export default function MovieDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-white">
            {/* Hero Section */}
            <View className="relative w-full h-[60%]">
                <Image source={{ uri: MOVIE.posterUrl }} className="w-full h-full" resizeMode="cover" />

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    className="absolute bottom-0 left-0 right-0 h-48"
                />

                {/* Header Actions */}
                <View className="absolute left-0 right-0 flex-row justify-between items-center px-6 z-10" style={{ top: insets.top }}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border border-white/10"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border border-white/10">
                            <Share color="white" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border border-white/10">
                            <Maximize2 color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title Overlay */}
                <View className="absolute bottom-12 left-6 right-6">
                    <Text className="text-4xl font-bold text-white text-center mb-2">{MOVIE.title}</Text>
                    <Text className="text-gray-300 text-center font-medium">{MOVIE.year} • {MOVIE.duration}</Text>

                    <Text className="text-gray-300 text-center mt-4 text-sm leading-5 px-4" numberOfLines={3}>
                        {MOVIE.description} <Text className="font-bold text-white">MORE</Text>
                    </Text>
                </View>
            </View>

            {/* Content Sheet */}
            <View className="flex-1 bg-white -mt-6 rounded-t-3xl px-6 pt-8 pb-8">
                {/* Ratings */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4">
                        <Text className="text-lg font-bold text-primary mr-2">Ratings</Text>
                        <Info size={16} color="#8E8E93" />
                    </View>

                    <View className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <View className="flex-row items-center gap-2">
                            <View className="bg-yellow-400 px-1.5 py-0.5 rounded"><Text className="text-xs font-bold">IMDb</Text></View>
                            <Text className="font-bold text-primary">{MOVIE.ratings.imdb}<Text className="text-secondary font-normal">/10</Text></Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" }} className="w-6 h-6" resizeMode="contain" />
                            <Text className="font-bold text-primary">{MOVIE.ratings.amazon}<Text className="text-secondary font-normal">/5</Text></Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="bg-red-500 w-6 h-6 rounded-full items-center justify-center"><Text className="text-white text-[10px] font-bold">RT</Text></View>
                            <Text className="font-bold text-primary">{MOVIE.ratings.rt}</Text>
                        </View>
                    </View>
                </View>

                {/* Media */}
                <View className="mb-24">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-primary">Media</Text>
                        <Text className="text-sm font-semibold text-primary">Show all ›</Text>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="w-[48%] aspect-square rounded-2xl overflow-hidden">
                            <Image source={{ uri: MOVIE.media[0] }} className="w-full h-full" resizeMode="cover" />
                        </View>
                        <View className="w-[48%] flex-col gap-3">
                            <View className="w-full h-[80px] rounded-2xl overflow-hidden">
                                <Image source={{ uri: MOVIE.media[1] }} className="w-full h-full" resizeMode="cover" />
                            </View>
                            <View className="w-full flex-1 rounded-2xl overflow-hidden relative">
                                <Image source={{ uri: MOVIE.media[2] }} className="w-full h-full" resizeMode="cover" />
                                <View className="absolute inset-0 bg-black/40 items-center justify-center">
                                    <Text className="text-white font-bold text-lg">+12</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Floating Action Bar */}
            <View className="absolute bottom-8 left-6 right-6 flex-row justify-between items-center bg-white shadow-lg shadow-black/10 rounded-full p-2 border border-gray-100">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-full">
                    <Check size={20} color="#1A1A1A" />
                    <Text className="ml-2 font-bold text-primary">Seen</Text>
                </TouchableOpacity>

                <View className="w-[1px] h-6 bg-gray-200" />

                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-full">
                    <ThumbsDown size={20} color="#1A1A1A" />
                    <Text className="ml-2 font-bold text-primary">Hide</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 bg-accent rounded-full shadow-lg">
                    <Bookmark size={20} color="white" fill="transparent" />
                    <Text className="ml-2 font-bold text-white">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
