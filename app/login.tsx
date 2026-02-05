import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock posters for background grid
const POSTERS = [
    "https://image.tmdb.org/t/p/w200/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", // Blade Runner
    "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
    "https://image.tmdb.org/t/p/w200/mwL3IIPY6DqT59H0sC9W5W8s9vQ.jpg", // Inception
    "https://image.tmdb.org/t/p/w200/sAtoqnRLUTIgk72BbmWp8yX97bM.jpg", // Interstellar
    "https://image.tmdb.org/t/p/w200/3vxvsmYLTf4jxtafacfTqhPgxXn.jpg", // Dune
    "https://image.tmdb.org/t/p/w200/ca3xKTmPEgGD5GXGvK5m7Yd27yV.jpg", // Joker
    "https://image.tmdb.org/t/p/w200/5M7oN3sznp99hWYQ9sX0xheswWX.jpg", // Dune 2
    "https://image.tmdb.org/t/p/w200/pw4AOCXHBqDnQyM9njI6L0b0Wd9.jpg", // Oppenheimer
    "https://image.tmdb.org/t/p/w200/hr9rjR3J0xBBK9oVrV28NYDHceh.jpg", // Iron Man
    "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers
    "https://image.tmdb.org/t/p/w200/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Wonder Woman
    "https://image.tmdb.org/t/p/w200/uxzzxijgPIY7slzFvMotPv892gR.jpg"  // Black Panther
];

export default function LoginScreen() {
    const router = useRouter();

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Background Grid */}
            <View className="flex-row flex-wrap opacity-50">
                {POSTERS.map((poster, index) => (
                    <View key={index} style={{ width: width / 3, height: height / 4 }}>
                        <Image
                            source={{ uri: poster }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>

            {/* Gradient Overlay */}
            <LinearGradient
                colors={['transparent', '#050505', '#000000']}
                locations={[0, 0.6, 1]}
                className="absolute inset-0"
            />

            {/* Content Content - Absolute Bottom */}
            <View className="absolute bottom-0 left-0 right-0 p-6 pb-12">
                <Text className="text-white text-5xl font-bold mb-8 text-center leading-tight">
                    Let's Get Started
                </Text>

                <View className="gap-4">
                    {/* Sign Up For Free */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white/10 border border-white/20 h-14 rounded-full items-center justify-center backdrop-blur-md"
                    >
                        <Text className="text-white font-bold text-lg">Sign up for free</Text>
                    </TouchableOpacity>

                    {/* Google */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white/10 border border-white/20 h-14 rounded-full flex-row items-center justify-center backdrop-blur-md gap-3"
                    >
                        <AntDesign name="google" size={20} color="white" />
                        <Text className="text-white font-bold text-lg">Continue with Google</Text>
                    </TouchableOpacity>

                    {/* Apple */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white/10 border border-white/20 h-14 rounded-full flex-row items-center justify-center backdrop-blur-md gap-3"
                    >
                        
                        <Text className="text-white font-bold text-lg">Continue with Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Login Link */}
                <TouchableOpacity onPress={handleLogin} className="mt-8 items-center">
                    <Text className="text-gray-400 font-medium text-base">
                        Already have an account? <Text className="text-white font-bold">Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
