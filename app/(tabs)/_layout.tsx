import { Tabs } from "expo-router";
import { Bookmark, Compass, Copy, Search } from "lucide-react-native";
import { CustomTabBar } from "../../components/ui/CustomTabBar";

export default function TabsLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: "#F8F9FA" },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Browse",
                    tabBarIcon: ({ color, size }) => <Compass size={size} color={color} strokeWidth={2.5} />,
                }}
            />
            <Tabs.Screen
                name="watchlist"
                options={{
                    title: "Watchlist",
                    tabBarIcon: ({ color, size }) => <Bookmark size={size} color={color} strokeWidth={2.5} />,
                }}
            />
            <Tabs.Screen
                name="match"
                options={{
                    title: "Match",
                    tabBarIcon: ({ color, size }) => <Copy size={size} color={color} strokeWidth={2.5} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} strokeWidth={2.5} />,
                }}
            />
        </Tabs>
    );
}
