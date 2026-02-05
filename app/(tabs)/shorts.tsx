import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ArrowLeft, Heart, MessageCircle, MoreHorizontal, Play, Share2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const SHORTS = [
    {
        id: '1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'Cinematic Masterpiece',
        user: 'DirectorCut',
        likes: '1.2M',
        comments: '4K',
    },
    {
        id: '2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Animation Magic',
        user: 'BlenderStudio',
        likes: '850K',
        comments: '2.1K',
    },
    {
        id: '3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Action Sequence',
        user: 'MovieBuff',
        likes: '2.5M',
        comments: '10K',
    }
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function ShortItem({ item, isActive, bottomInset }: { item: typeof SHORTS[0], isActive: boolean, bottomInset: number }) {
    const player = useVideoPlayer(item.videoUrl, player => {
        player.loop = true;
    });
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(isActive);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isActive) {
            player.play();
            setIsPlaying(true);
            setIsLoading(true);
        } else {
            player.pause();
            setIsPlaying(false);
        }
    }, [isActive, player]);

    useEffect(() => {
        const subscription = player.addListener('playingChange', (event) => {
            if (event.isPlaying) {
                setIsLoading(false);
            }
        });
        return () => {
            subscription.remove();
        };
    }, [player]);

    const togglePlayback = () => {
        if (player.playing) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };

    return (
        <View style={{ height: SCREEN_HEIGHT - bottomInset, width: Dimensions.get('window').width }} className="relative bg-black">
            <TouchableOpacity activeOpacity={1} onPress={togglePlayback} style={{ flex: 1 }}>
                <VideoView
                    player={player}
                    style={{ flex: 1, width: '100%' }}
                    contentFit="cover"
                    nativeControls={false}
                />

                {isLoading && isPlaying && (
                    <View className="absolute inset-0 items-center justify-center bg-black/10 z-10">
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {!isPlaying && !isLoading && (
                    <View className="absolute inset-0 items-center justify-center bg-black/20">
                        <Play size={50} color="white" fill="white" style={{ opacity: 0.8 }} />
                    </View>
                )}
            </TouchableOpacity>

            <View className="absolute inset-0 bg-black/10 pointer-events-none" />
            <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            <View className="absolute bottom-20 right-4 items-center gap-6">
                <View className="items-center gap-1">
                    <TouchableOpacity>
                        <Heart size={30} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">{item.likes}</Text>
                </View>

                <View className="items-center gap-1">
                    <TouchableOpacity>
                        <MessageCircle size={30} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xs font-semibold">{item.comments}</Text>
                </View>

                <TouchableOpacity>
                    <Share2 size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MoreHorizontal size={30} color="white" />
                </TouchableOpacity>
            </View>

            <View className="absolute bottom-8 left-4 right-16">
                <Text className="text-white font-bold text-lg mb-1">@{item.user}</Text>
                <Text className="text-white/90 text-sm leading-5">{item.title} #movie #cinema #shorts</Text>

                <TouchableOpacity
                    className="flex-row items-center mt-3 bg-white/20 self-start px-3 py-1.5 rounded-full backdrop-blur-sm"
                    onPress={() => { player.pause(); router.push('/movie/1') }}
                >
                    <Play size={12} color="white" fill="white" className="mr-2" />
                    <Text className="text-white text-xs font-bold">Watch Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function ShortsPage() {
    const bottomTabHeight = useBottomTabBarHeight();
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    }).current;

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <FlatList
                data={SHORTS}
                renderItem={({ item, index }) => (
                    <ShortItem
                        item={item}
                        isActive={index === activeIndex}
                        bottomInset={0}
                    />
                )}
                keyExtractor={item => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
                getItemLayout={(data, index) => (
                    { length: SCREEN_HEIGHT, offset: SCREEN_HEIGHT * index, index }
                )}
            />

            {/* Back Button Overlay */}
            <TouchableOpacity
                className="absolute top-12 left-4 w-10 h-10 rounded-full bg-black/30 items-center justify-center backdrop-blur-md z-50"
                onPress={() => router.push('/(tabs)')}
            >
                <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}
