import { useGetMovieByIdQuery } from "@/slices/movieApiSlice";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { Bookmark, ChevronLeft, Maximize2, Share, ThumbsDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

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
    const { data: movie } = useGetMovieByIdQuery(id);
    const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const player = useVideoPlayer(movie?.trailerUrl, player => {
        player.loop = false;
        player.play();
    });


    useEffect(() => {
        if (movie?.seasons?.length > 0 && !selectedSeasonId) {
            setSelectedSeasonId(movie.seasons[0]._id);
        }
    }, [movie]);

    const seasonsData = movie?.seasons?.map((season: any) => ({
        label: `Season ${season.seasonNumber}`,
        value: season._id,
    })) || [];

    const castsData = movie?.casts?.map((cast: any) => ({
        name: cast.name,
        job: cast.job,
    })) || [];

    return (
        <View className="flex-1 bg-white">
            <View className="relative w-full h-[30%]">
                <View className="w-full h-full relative">
                    <VideoView
                        player={player}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        contentFit="cover"
                        nativeControls={false} // Only show controls for the movie
                    />
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
            </View>

            <View className="flex-1 bg-background -mt-6 rounded-t-3xl px-6 pt-8 pb-8">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className="mb-8">
                        <Text className="text-2xl font-bold text-primary">{movie?.title}</Text>
                        <Text className="text-gray-300 mt-3 text-sm leading-5" numberOfLines={3}>
                            {movie?.description}
                        </Text>
                    </View>

                    {movie?.type?.toLowerCase() === 'series' && movie && movie.seasons?.length > 0 && (
                        <View className="mb-8">
                            <View className="flex-row justify-between items-center mb-8">
                                <Text className="text-lg font-bold text-primary">Episodes</Text>
                                <View className="w-40">
                                    <Dropdown
                                        style={[
                                            {
                                                height: 40,
                                                borderColor: '#333',
                                                borderWidth: 1,
                                                borderRadius: 8,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#0a0a0a',
                                            },
                                            isFocus && { borderColor: '#333' },
                                        ]}
                                        placeholderStyle={{ fontSize: 14, color: '#888' }}
                                        selectedTextStyle={{ fontSize: 14, color: 'white' }}
                                        inputSearchStyle={{ height: 40, fontSize: 16 }}
                                        iconStyle={{ width: 20, height: 20, tintColor: 'white' }}
                                        data={seasonsData}
                                        search={false}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select season' : '...'}
                                        searchPlaceholder="Search..."
                                        value={selectedSeasonId}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setSelectedSeasonId(item.value);
                                            setIsFocus(false);
                                        }}
                                        containerStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderWidth: 1, borderRadius: 8 }}
                                        itemTextStyle={{ color: '#ccc' }}
                                        activeColor="#333"
                                    />
                                </View>
                            </View>
                            {movie.seasons
                                .find((s: any) => s._id === selectedSeasonId)
                                ?.episodes?.map((ep: any, index: number) => {
                                    return (
                                        <View key={ep._id || index} className="flex-row mb-4 gap-4">
                                            <Image source={{ uri: ep.thumbnail }} className="w-28 h-20 rounded-lg bg-gray-200" resizeMode="cover" />
                                            <View className="flex-1 justify-center">
                                                <Text className="font-bold text-primary">{ep.episodeNumber}. {ep.title}</Text>
                                                <Text className="text-xs text-gray-500">{ep.duration} • {ep.description}</Text>
                                            </View>
                                            {/* <View className="justify-center">
                                                <Check size={16} color="#ccc" />
                                            </View> */}
                                        </View>
                                    )
                                })}
                        </View>
                    )}

                    {/* Cast Section */}
                    <View className="mb-8">
                        <Text className="text-lg font-bold text-primary mb-4">Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {castsData.map((actor: any, index: number) => (
                                <View key={index} className="mr-4 items-center w-20">
                                    <Image source={{ uri: "https://image.tmdb.org/t/p/w200/lyUyVARQKhGxaxy0FUENSWE139z.jpg" }} className="w-16 h-16 rounded-full bg-gray-200 mb-2" />
                                    <Text className="text-xs font-bold text-center text-primary" numberOfLines={1}>{actor.name}</Text>
                                    <Text className="text-[10px] text-center text-gray-500" numberOfLines={1}>{actor.job}</Text>
                                </View>
                            ))}
                        </ScrollView>
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
            <BlurView intensity={20} tint="dark" className="absolute bottom-16 left-6 right-6 flex-row justify-between items-center overflow-hidden rounded-full p-2 border border-white/20">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4 rounded-full">
                    <Bookmark size={20} color="white" fill="transparent" />
                    <Text className="ml-2 font-bold text-white">Save</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/watch/${id}`)} className="flex-1 flex-row items-center justify-center py-4 bg-accent rounded-full shadow-lg">
                    <Text className="ml-2 font-bold text-primary">Watch now</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
}
