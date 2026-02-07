import { getErrorMessage } from "@/lib/errorHandler";
import Toast from "react-native-toast-message";

export const useErrorHandler = () => {
    const handleError = (error: any, fallbackMessage?: string) => {
        const message = getErrorMessage(error) || fallbackMessage || 'Something went wrong';

        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            visibilityTime: 4000,
        });
    };

    return handleError;
};
