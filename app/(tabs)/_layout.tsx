import { Tabs } from "expo-router";
import { Bookmark, Compass, PlayCircle, Search } from "lucide-react-native";
import { StatusBar } from "react-native";
import { CustomTabBar } from "../../components/ui/CustomTabBar";

export default function TabsLayout() {
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
            <Tabs
                tabBar={(props) => {
                    // Hide tab bar on 'shorts' route for immersive experience
                    const routeName = props.state.routes[props.state.index].name;
                    if (routeName === 'shorts') return null;
                    return <CustomTabBar {...props} />;
                }}
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
