import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';
import { Provider } from "react-redux";
import { toastConfig } from "../components/CustomToast";
import "../global.css";
import { loadUser } from "../slices/authSlice";
import { makeStore } from "../store/store";

const store = makeStore();
store.dispatch(loadUser());

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View className="flex-1 bg-background">
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </View>
    </Provider>
  );
}
