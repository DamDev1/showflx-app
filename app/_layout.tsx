import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';
import { Provider } from "react-redux";
import { toastConfig } from "../components/CustomToast";
import "../global.css";
import { makeStore } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={makeStore()}>
      <View className="flex-1 bg-background">
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </View>
    </Provider>
  );
}
