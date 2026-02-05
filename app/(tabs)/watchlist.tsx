import { Grid, List, Search, SlidersHorizontal } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const WATCHLIST = [
    { id: '1', title: 'Dahmer', imageUrl: 'https://image.tmdb.org/t/p/w500/f2PVrphK0u81ES256lw3oAZuF3x.jpg', year: '2022' },
    { id: '2', title: 'One Battle', imageUrl: 'https://image.tmdb.org/t/p/w500/hYqOjJ7Gh1fbqXrxlIao1g8ZJFm.jpg', year: '2024' },
    { id: '3', title: 'The Sixth Sense', imageUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', year: '1999' },
    { id: '4', title: 'Oppenheimer', imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', year: '2023' },
    { id: '5', title: 'Fight Club', imageUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', year: '1999' },
    { id: '6', title: 'Interstellar', imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniL6C8z19uVOtYnZ54Jj6b.jpg', year: '2014' },
];

export default function WatchlistScreen() {
    return (
        <View className="flex-1 bg-background pt-12">
            <View className="px-6 mb-4">
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-2xl font-bold text-primary">My watchlist</Text>

                    <View className="flex-row bg-white/5 rounded-lg p-1">
                        <TouchableOpacity className="p-2 bg-white/20 rounded-md shadow-sm">
                            <Grid size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <List size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-primary font-semibold">145 items</Text>

                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity className="flex-row items-center">
                            <SlidersHorizontal size={16} color="#8E8E93" className="mr-2" />
                            <Text className="text-secondary text-sm">Custom order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Search size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList
                data={WATCHLIST}
                numColumns={2}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <TouchableOpacity className="mb-6 w-[48%]">
                        <View className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-card mb-2">
                            <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
                            {item.year === '2024' && (
                                <View className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded text-xs">
                                    <Text className="text-[10px] font-bold text-black">New Release</Text>
                                </View>
                            )}
                        </View>
                        <Text className="text-primary font-bold">{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
