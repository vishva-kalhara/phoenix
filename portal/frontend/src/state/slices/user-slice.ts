import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    apiKey: string | null;
}

const initialState: IUser = {
    apiKey: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.apiKey = action.payload.apiKey;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice;
