import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../global.css";
import { makeStore } from "../store/store";

export default function RootLayout() {
  return <Provider store={makeStore()}>
    <View className="flex-1 bg-background">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  </Provider>;
}
