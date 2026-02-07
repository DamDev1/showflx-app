import { getErrorMessage } from "@/lib/errorHandler";
import Toast from "react-native-toast-message";

export function useErrorHandler() {

    const handleError = (error: any, fallbackMessage?: string) => {
        const message = getErrorMessage(error) || fallbackMessage || 'Something went wrong';
        Toast.show({
            type: 'error',
            text1: message,
        });
    };

    return handleError;
}
