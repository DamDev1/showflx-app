import { Tabs } from "expo-router";
import { Bookmark, Compass, PlayCircle, Search } from "lucide-react-native";
import { StatusBar } from "react-native";
import { CustomTabBar } from "../../components/ui/CustomTabBar";

export default function TabsLayout() {
    return (
        <>
            <StatusBar backgroundColor="#050505" barStyle={"light-content"} />
            <Tabs
                tabBar={(props) => {
                    const routeName = props.state.routes[props.state.index].name;
                    if (routeName === 'shorts') return null;
                    return <CustomTabBar {...props} />;
                }}
                screenOptions={{
                    headerShown: false,
                    sceneStyle: { backgroundColor: "#050505" },
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
                    name="shorts"
                    options={{
                        title: "Shorts",
                        tabBarIcon: ({ color, size }) => <PlayCircle size={size} color={color} strokeWidth={2.5} />,
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
        </>
    );
}
