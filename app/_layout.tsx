import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";

export default function RootLayout() {
  return <Provider store={makeStore()}>
    <Stack screenOptions={{ headerShown: false }} />
  </Provider>;
}
