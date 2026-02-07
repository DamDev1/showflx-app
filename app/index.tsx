import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";


export default function Index() {
  const { userInfo, isLoading } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return <Redirect href={userInfo ? "/(tabs)" : "/welcome"} />;
}
