import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface WatchNextCardProps {
    movie: {
        id: string;
        title: string;
        year: string;
        duration: string;
        rating: string;
        genres: string[];
        posterUrl: string;
        backdropUrl?: string;
    };
}

export default function WatchNextCard({ movie }: WatchNextCardProps) {
    return (
        <TouchableOpacity className="mr-5 w-[320px] h-[160px] rounded-[24px] overflow-hidden bg-card shadow-sm relative">
            {/* Background subtle gradient for depth */}
            <LinearGradient
                colors={['#27272a', '#18181b']}
                className="absolute inset-0"
            />

            <View className="flex-row h-full p-3">
                {/* Left: Poster */}
                <View className="w-[100px] h-full rounded-2xl overflow-hidden shadow-sm">
                    <Image
                        source={{ uri: movie.posterUrl }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Right: Info */}
                <View className="flex-1 ml-4 justify-center">
                    <Text className="text-lg font-bold text-primary mb-1" numberOfLines={1}>
                        {movie.title}
                    </Text>
                    <Text className="text-secondary text-xs font-medium mb-3">
                        {movie.year} • {movie.duration}
                    </Text>

                    <View className="flex-row items-center gap-2">
                        <View className="bg-yellow-400 px-2 py-1 rounded-lg flex-row items-center">
                            <Text className="text-xs font-extrabold text-black">{movie.rating}</Text>
                        </View>

                        {movie.genres.slice(0, 2).map((genre) => (
                            <View key={genre} className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 shadow-sm">
                                <Text className="text-xs font-medium text-gray-300">{genre}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
