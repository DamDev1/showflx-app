import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    console.log(colorScheme);
    return (
        <TouchableOpacity
            onPress={toggleColorScheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        >
            {colorScheme === 'dark' ? (
                <Sun size={24} color="#FDB813" />
            ) : (
                <Moon size={24} color="#1A1A1A" />
            )}
        </TouchableOpacity>
    );
}
