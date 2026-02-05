import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Bookmark, Check, ChevronLeft, Info, Maximize2, Play, Share, ThumbsDown } from "lucide-react-native";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    ],
    cast: [
        { id: 1, name: "Ryan Gosling", role: "K", image: "https://image.tmdb.org/t/p/w200/lyUyVARQKhGxaxy0FUENSWE139z.jpg" },
        { id: 2, name: "Harrison Ford", role: "Rick Deckard", image: "https://image.tmdb.org/t/p/w200/5M7oN3sznp99hWYQ9sX0xheswWX.jpg" },
        { id: 3, name: "Ana de Armas", role: "Joi", image: "https://image.tmdb.org/t/p/w200/3vxvsmYLTf4jxtafacfTqhPgxXn.jpg" },
        { id: 4, name: "Jared Leto", role: "Niander Wallace", image: "https://image.tmdb.org/t/p/w200/ca3xKTmPEgGD5GXGvK5m7Yd27yV.jpg" }
    ],
    episodes: [
        { id: 1, title: "Pilot", duration: "58m", image: "https://image.tmdb.org/t/p/w500/93FJBiDcUBBJnzif1d7lauGgW0.jpg", synopsis: "A new beginning." },
        { id: 2, title: "Reunion", duration: "55m", image: "https://image.tmdb.org/t/p/w500/mK9kI0Y4D21O2QWck28a6fG8bNl.jpg", synopsis: "Old friends meet." },
        { id: 3, title: "The Truth", duration: "60m", image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", synopsis: "Secrets revealed." }
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
                <View className="w-full h-full relative">
                    <Image source={{ uri: MOVIE.posterUrl }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute inset-0 bg-black/60" />
                </View>

                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.73)']}
                    className="absolute bottom-0 left-0 right-0 h-48"
                />
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

                    <TouchableOpacity
                        className="flex-row items-center justify-center bg-white self-center px-8 py-3 rounded-full mt-6 shadow-lg shadow-black/20"
                        onPress={() => router.push(`/watch/${id}`)}
                    >
                        <Play size={20} color="black" fill="black" />
                        <Text className="text-black font-bold ml-2 text-base">Watch Movie</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content Sheet */}
            <View className="flex-1 bg-white -mt-6 rounded-t-3xl px-6 pt-8 pb-8">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
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

                    {/* Cast Section */}
                    <View className="mb-8">
                        <Text className="text-lg font-bold text-primary mb-4">Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {MOVIE.cast.map((actor) => (
                                <View key={actor.id} className="mr-4 items-center w-20">
                                    <Image source={{ uri: actor.image }} className="w-16 h-16 rounded-full bg-gray-200 mb-2" />
                                    <Text className="text-xs font-bold text-center text-primary" numberOfLines={1}>{actor.name}</Text>
                                    <Text className="text-[10px] text-center text-gray-500" numberOfLines={1}>{actor.role}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Episodes Section (Mocking for now, usually conditional) */}
                    <View className="mb-8">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-primary">Season 1</Text>
                            <Text className="text-sm font-semibold text-primary">All episodes ›</Text>
                        </View>
                        {MOVIE.episodes.map((ep) => (
                            <View key={ep.id} className="flex-row mb-4 gap-4">
                                <Image source={{ uri: ep.image }} className="w-28 h-16 rounded-lg bg-gray-200" resizeMode="cover" />
                                <View className="flex-1 justify-center">
                                    <Text className="font-bold text-primary">{ep.id}. {ep.title}</Text>
                                    <Text className="text-xs text-gray-500">{ep.duration} • {ep.synopsis}</Text>
                                </View>
                                <View className="justify-center">
                                    <Check size={16} color="#ccc" />
                                </View>
                            </View>
                        ))}
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
                </ScrollView>
            </View>

            {/* Floating Action Bar */}
            <View className="absolute bottom-8 left-6 right-6 flex-row justify-between items-center bg-white shadow-lg shadow-black/10 rounded-full p-2 border border-gray-100">

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
