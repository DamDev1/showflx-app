import { logout } from "./authUtils";


export const getErrorMessage = (error: any): string => {
    if (!error) return 'An unknown error occurred';

    if (error.status === 401){
        if(error.data.message.message === "Invalid Token"){
            logout();
            window.location.reload()
        }
    }

    if(error.data.message.message){
        return error.data.message.message
    }

    return 'An unexpected error occurred';
};

