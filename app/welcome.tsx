import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StatusBar, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Unlock a World of Epic Anime Adventures!',
        subtitle: 'With ShowFlx, stream your favorite series and movies anytime, anywhere.',
        image: 'https://image.tmdb.org/t/p/original/bSXfU4zoWDXVDrDbqMJCg8H9x9c.jpg', // Demon Slayer
        progress: '4:31',
    },
    {
        id: '2',
        title: 'Discover Blockbuster Movies & Originals',
        subtitle: 'Get access to exclusive content and the latest releases in 4K HDR.',
        image: 'https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', // Blade Runner
        progress: '1:12',
    },
    {
        id: '3',
        title: 'Watch Anywhere, Cancel Anytime',
        subtitle: ' Download specific titles to watch offline on your phone or tablet.',
        image: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // Dark Knight
        progress: '2:45',
    }
];

export default function WelcomeScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            router.push('/signup');
        }
    };

    const handleLogin = () => {
        router.push('/login');
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    type SlideItem = typeof SLIDES[0];

    const renderItem = ({ item }: { item: SlideItem }) => (
        <View style={{ width: width, alignItems: 'center', paddingHorizontal: 24, paddingTop: 24 }}>
            {/* Hero Image Container */}
            <View className="w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10 relative shadow-2xl shadow-primary/20 bg-gray-900">
                <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Fake Player Overlay elements to match reference */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    className="absolute bottom-0 left-0 right-0 h-24 justify-end pb-4 px-4"
                >
                    <View className="flex-row items-center gap-3">
                        <Text className="text-white/80 text-xs font-medium">{item.progress}</Text>
                        <View className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                            <View className="w-[30%] h-full bg-white rounded-full" />
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Text Content */}
            <View className="mt-12 items-center w-full">
                <Text className="text-white text-4xl font-bold text-center leading-tight">
                    {item.title}
                </Text>

                <Text className="text-gray-400 text-center mt-4 text-base px-2 leading-6">
                    {item.subtitle}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#050505]">
            <StatusBar barStyle="light-content" backgroundColor="#050505" />

            {/* Header / Logo */}
            <View className="items-center py-4">
                <View className="flex-row items-center gap-2">
                    {/* Simple Logo Placeholder */}
                    <View className="w-6 h-6 rounded-full border-2 border-white items-center justify-center">
                        <View className="w-2 h-2 bg-white rounded-full" />
                    </View>
                    <Text className="text-white text-xl font-bold tracking-wider">ShowFlx</Text>
                </View>
            </View>

            {/* Carousel */}
            <View className="flex-1">
                <FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                    keyExtractor={(item) => item.id}
                    scrollEventThrottle={16}
                />

                {/* Pagination Dots (Fixed Position Overlay within Content Area if needed, or structured below) */}
                <View className="items-center mt-4">
                    <View className="flex-row gap-2">
                        {SLIDES.map((_, index) => (
                            <View
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </View>
                </View>
            </View>

            {/* Footer Actions */}
            <View className="flex-row items-center justify-between px-8 pb-8 pt-4">
                <TouchableOpacity onPress={handleLogin}>
                    <Text className="text-white font-semibold text-lg">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-white/10 py-4 px-12 rounded-full border border-white/10"
                >
                    <Text className="text-white font-semibold text-lg">
                        {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}