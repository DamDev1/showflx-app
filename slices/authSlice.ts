import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    name: string;
    email: string;
    role?: 'user';
    profilePhotoUrl?: string;
}

interface AuthState {
    userInfo: UserInfo | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    userInfo: null,
    token: null,
    refreshToken: null,
    isLoading: true,
};

// ... imports

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    try {
        const stored = await AsyncStorage.getItem('showflx-auth');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ userInfo: UserInfo; token: string; refreshToken: string }>
        ) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            AsyncStorage.setItem('showflx-auth', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.refreshToken = null;
            AsyncStorage.removeItem('showflx-auth');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.userInfo = action.payload.userInfo;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
            }
            state.isLoading = false;
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;