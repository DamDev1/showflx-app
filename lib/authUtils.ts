import { makeStore } from "@/store/store";
import { logout as logoutAction } from "@/slices/authSlice";


export const logout = () => {
    makeStore().dispatch(logoutAction());
};
