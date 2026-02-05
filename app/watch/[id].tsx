import { useLocalSearchParams, useRouter } from 'expo-router';
import { lockAsync, OrientationLock, unlockAsync } from 'expo-screen-orientation';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ArrowLeft, SkipForward } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

const AD_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
// Use a different video for the movie to verify transition
const MOVIE_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function WatchPage() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Lock to Landscape on mount, unlock on unmount
    useEffect(() => {
        async function lockOrientation() {
            await lockAsync(OrientationLock.LANDSCAPE);
        }
        lockOrientation();

        return () => {
            unlockAsync();
        };
    }, []);

    // Ad State
    const [isAd, setIsAd] = useState(true);
    const [adTimer, setAdTimer] = useState(5); // 5 seconds before skip
    const [canSkip, setCanSkip] = useState(false);

    // Initialize player with Ad URL
    const player = useVideoPlayer(AD_URL, player => {
        player.loop = false;
        player.play();
    });

    // Handle Ad Timer
    useEffect(() => {
        if (!isAd) return;

        const interval = setInterval(() => {
            setAdTimer((prev) => {
                if (prev <= 1) {
                    setCanSkip(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isAd]);

    // Handle Ad End (Seamless transition)
    useEffect(() => {
        const subscription = player.addListener('playToEnd', () => {
            if (isAd) {
                skipAd();
            }
        });
        return () => subscription.remove();
    }, [isAd, player]);

    const skipAd = () => {
        setIsAd(false);
        player.replace(MOVIE_URL); // Seamlessly swap source
        player.play();
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar hidden />

            <VideoView
                player={player}
                style={{ flex: 1, width: '100%', height: '100%' }}
                contentFit="contain"
                nativeControls={!isAd} // Only show controls for the movie
            />

            {/* Header / Back Button (Visible during Ad or via controls in movie) */}
            <View className="absolute top-12 left-6 z-50">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
            </View>

            {/* Ad Overlay */}
            {isAd && (
                <View className="absolute bottom-12 right-6 z-50 flex-row items-center">
                    {!canSkip ? (
                        <View className="bg-black/60 px-4 py-2 rounded-lg border border-white/10">
                            <Text className="text-white font-medium">Skip in {adTimer}</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={skipAd}
                            className="bg-white px-6 py-3 rounded-lg flex-row items-center shadow-lg"
                        >
                            <Text className="text-black font-bold mr-2">Skip Ad</Text>
                            <SkipForward size={20} color="black" fill="black" />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {isAd && (
                <View className="absolute bottom-12 left-6 bg-yellow-400 px-2 py-1 rounded">
                    <Text className="text-xs font-bold text-black uppercase">Ad</Text>
                </View>
            )}
        </View>
    );
}
