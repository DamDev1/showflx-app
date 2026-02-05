import SectionHeader from '@/components/browse/SectionHeader';
import WatchNextCard from '@/components/browse/WatchNextCard';
import Header from '@/components/ui/header';
import { MovieCard } from '@/components/ui/MovieCard';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Temporary Mock Data
const WATCH_NEXT = [
    {
        id: '1',
        title: 'Blade Runner 2049',
        year: '2017',
        duration: '2h 43m',
        rating: '8.0',
        genres: ['Sci-fi', 'Thriller'],
        posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    },
    {
        id: '2',
        title: 'Interstellar',
        year: '2014',
        duration: '2h 49m',
        rating: '8.7',
        genres: ['Sci-fi', 'Adventure'],
        posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    }
];

const TRENDING = [
    {
        id: '1',
        title: 'Dune: Part Two',
        imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        borderColor: '#22c55e' // green
    },
    {
        id: '2',
        title: 'Blade Runner 2049',
        imageUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
        borderColor: '#a855f7' // purple
    },
    {
        id: '3',
        title: 'Ted Lasso',
        imageUrl: 'https://image.tmdb.org/t/p/w500/93FJBiDcUBBJnzif1d7lauGgW0.jpg',
        borderColor: '#3b82f6' // blue
    },
    {
        id: '4',
        title: 'The Long Way',
        imageUrl: 'https://image.tmdb.org/t/p/w500/mK9kI0Y4D21O2QWck28a6fG8bNl.jpg',
        borderColor: '#eab308' // yellow
    }
];

import { useRouter } from 'expo-router';

export default function BrowsePage() {
    const router = useRouter();
    return (
        <SafeAreaView className='flex-1 bg-background' edges={['top']}>
            <View className='px-4 mb-2'>
                <Header />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="mt-4 mb-8">
                    <SectionHeader
                        title="Watch next"
                        subtitle="Based on your interests"
                        actionLabel="List view"
                        icon="list"
                        onActionPress={() => { }}
                    />
                    <FlatList
                        horizontal
                        data={WATCH_NEXT}
                        renderItem={({ item }) => <WatchNextCard movie={item} />}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>

                <View className="mb-8">
                    <SectionHeader
                        title="Trending now"
                        subtitle="Based on your saved movies"
                        actionLabel="Show all"
                        icon="arrow"
                        onActionPress={() => { }}
                    />
                    <FlatList
                        horizontal
                        data={TRENDING}
                        renderItem={({ item }) => (
                            <View className={`rounded-[26px] p-[2px] mr-3`}>
                                <View className={`bg-card rounded-[24px]`}>
                                    <MovieCard
                                        title={item.title}
                                        imageUrl={item.imageUrl}
                                        variant="compact"
                                        onPress={() => router.push('/(tabs)/shorts')}
                                    />
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>

                {/* Highest Rated Section (Placeholder to match design scroll) */}
                <View className="mb-4">
                    <SectionHeader
                        title="Highest rated"
                        subtitle="Community rating"
                        actionLabel="Show all"
                        onActionPress={() => { }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}