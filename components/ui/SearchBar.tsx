import { Search } from "lucide-react-native";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchBarProps extends TextInputProps {
    containerClassName?: string;
}

export function SearchBar({ containerClassName, ...props }: SearchBarProps) {
    return (
        <View className={`flex-row items-center bg-gray-200 rounded-xl px-4 py-3 border border-gray-300 ${containerClassName}`}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
                className="flex-1 ml-3 text-black"
                placeholderTextColor="#9CA3AF"
                {...props}
            />
        </View>
    );
}
