import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    accessToken: string | null;
}

const initialState: authState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        removeAccessToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
