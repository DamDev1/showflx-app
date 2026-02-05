import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { MovieCard } from "../../components/ui/MovieCard";
import { SearchBar } from "../../components/ui/SearchBar";
import { Movie, useSearchMoviesQuery } from "../../slices/movieApiSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const { data: movies, isLoading, isFetching } = useSearchMoviesQuery(query, {
        skip: query.length < 2,
    });

    const renderItem = ({ item }: { item: Movie }) => (
        <MovieCard
            title={item.title}
            imageUrl={item.posterUrl}
            rating={item.rating?.toFixed(1)}
            variant="poster"
            style={{ marginBottom: 16, width: '48%' }}
        />
    );

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 px-4 pt-2">
                <Text className="text-2xl font-bold text-primary mb-4">Search</Text>

                <SearchBar
                    placeholder="Search movies, shows..."
                    value={query}
                    onChangeText={setQuery}
                    containerClassName="mb-6"
                    autoFocus
                />

                {isLoading || isFetching ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-secondary">Searching...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={movies || []}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={
                            query.length >= 2 ? (
                                <View className="flex-1 justify-center items-center mt-20">
                                    <Text className="text-secondary text-center">No results found for &quot;{query}&quot;</Text>
                                </View>
                            ) : (
                                <View className="flex-1 justify-center items-center mt-20">
                                    <Text className="text-secondary text-center">Type something to search...</Text>
                                </View>
                            )
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

