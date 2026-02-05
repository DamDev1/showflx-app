import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Check, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfilePage() {
    const router = useRouter();
    const [name, setName] = useState('Tyrese');
    const [email, setEmail] = useState('tyrese@example.com');
    const [username, setUsername] = useState('@tyrese');
    const [bio, setBio] = useState('Movie enthusiast. Sci-fi lover. Always looking for the next binge-worthy series.');

    const handleSave = () => {
        // Logic to save profile changes would go here
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/5 items-center justify-center active:bg-white/10"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-primary">Edit Profile</Text>
                <TouchableOpacity
                    onPress={handleSave}
                    className="w-10 h-10 rounded-full bg-primary items-center justify-center"
                >
                    <Check size={20} color="#000000" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Avatar Section */}
                <View className="items-center py-8">
                    <View className="relative">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60' }}
                            className="w-32 h-32 rounded-full bg-white/10"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white items-center justify-center border-4 border-background active:bg-gray-200">
                            <Camera size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-secondary mt-4 text-sm">Tap camera to change photo</Text>
                </View>

                {/* Form Fields */}
                <View className="gap-6">
                    <View>
                        <Text className="text-secondary font-semibold mb-2 ml-1 uppercase text-xs tracking-wider">Full Name</Text>
                        <View className="flex-row items-center bg-card border border-white/10 rounded-2xl px-4 py-3 focus:border-primary">
                            <User size={20} color="#9CA3AF" className="mr-3" />
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                className="flex-1 text-primary"
                                placeholder="Enter full name"
                                placeholderTextColor="#666"
                            />
                        </View>
                    </View>

                    <View>
                        <Text className="text-secondary font-semibold mb-2 ml-1 uppercase text-xs tracking-wider">Username</Text>
                        <View className="flex-row items-center bg-card border border-white/10 rounded-2xl px-4 py-3">
                            <Text className="text-secondary mr-1">@</Text>
                            <TextInput
                                value={username.replace('@', '')}
                                onChangeText={(text) => setUsername(`@${text}`)}
                                className="flex-1 text-primary"
                                placeholder="username"
                                placeholderTextColor="#666"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View>
                        <Text className="text-secondary font-semibold mb-2 ml-1 uppercase text-xs tracking-wider">Email Address</Text>
                        <View className="flex-row gap-1 items-center bg-card/50 border border-white/5 rounded-2xl px-4 py-3 opacity-80">
                            <Mail size={20} color="#9CA3AF" className="mr-3" />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                className="flex-1 text-secondary"
                                placeholder="Enter email"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                                editable={false} 
                            />
                            {/* <Lock size={16} color="#666" /> */}
                        </View>
                        <Text className="text-xs text-secondary/60 mt-1 ml-1">Email cannot be changed via mobile.</Text>
                    </View>

                    <View>
                        <Text className="text-secondary font-semibold mb-2 ml-1 uppercase text-xs tracking-wider">Bio</Text>
                        <View className="bg-card border border-white/10 rounded-2xl px-4 py-3 h-32 items-start">
                            <TextInput
                                value={bio}
                                onChangeText={setBio}
                                className="flex-1 text-primary w-full leading-5"
                                placeholder="Write something about yourself..."
                                placeholderTextColor="#666"
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                </View>

                {/* Save Button (Bottom Sticky or inline) */}
                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-white mt-8 py-4 rounded-full items-center shadow-lg active:bg-gray-200 mb-12"
                >
                    <Text className="text-black font-bold text-lg">Save Changes</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
