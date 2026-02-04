import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { HomeHeader } from "../../components/home/HomeHeader";
import { MovieCard } from "../../components/ui/MovieCard";
import { SectionHeader } from "../../components/ui/SectionHeader";

const WATCH_NEXT = [
    {
        id: "1",
        title: "Blade Runner 2049",
        year: "2017",
        duration: "2h 43m",
        imageUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        rating: "8.0",
        tags: ["Sci-fi"],
        progress: 0.45,
    },
    {
        id: "2",
        title: "Dune: Part Two",
        year: "2024",
        duration: "2h 46m",
        imageUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        rating: "8.8",
        tags: ["Sci-fi", "Adv"],
        progress: 0.1,
    }
];

const TRENDING = [
    {
        id: "3",
        title: "Dune: Part Two",
        imageUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        progress: 0.8
    },
    {
        id: "4",
        title: "Blade Runner 2049",
        imageUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        progress: 0.2
    },
    {
        id: "5",
        title: "Ted Lasso",
        imageUrl: "https://image.tmdb.org/t/p/w500/3uMcFsiM6T6hI6vJ7C48K8NfJ0.jpg",
        progress: 0.6
    }
];

export default function BrowseScreen() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-background pt-12">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <HomeHeader />

                <SectionHeader
                    title="Watch next"
                    subtitle="Based on your interests"
                    actionText="List view"
                    actionIcon="list"
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-8">
                    {WATCH_NEXT.map(movie => (
                        <MovieCard
                            key={movie.id}
                            variant="highlight"
                            onPress={() => router.push(`/movie/${movie.id}`)}
                            {...movie}
                        />
                    ))}
                </ScrollView>

                <SectionHeader
                    title="Trending now"
                    subtitle="Based on your saved movies"
                    actionText="Show all"
                    actionIcon="showAll"
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-8">
                    {TRENDING.map(movie => (
                        <MovieCard
                            key={movie.id}
                            variant="compact"
                            onPress={() => router.push(`/movie/${movie.id}`)}
                            {...movie}
                        />
                    ))}
                </ScrollView>

                <SectionHeader
                    title="Highest rated"
                    subtitle="Community rating"
                    actionText="Show all"
                    actionIcon="showAll"
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-8">
                    {TRENDING.map(movie => (
                        <MovieCard
                            key={movie.id}
                            variant="compact"
                            onPress={() => router.push(`/movie/${movie.id}`)}
                            {...movie}
                        />
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
}
