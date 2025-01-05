import { IApplication } from "@/types/application-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppsState {
    apps: IApplication[];
    currentApp: IApplication | null;
    isFetching: boolean;
}

const initialState: IAppsState = {
    apps: [],
    currentApp: null,
    isFetching: false,
};

const appsSlice = createSlice({
    name: "apps",
    initialState,
    reducers: {
        setMyApps: (state, action: PayloadAction<IApplication[]>) => {
            state.apps = action.payload;
        },
        setCurrentApp: (state, action: PayloadAction<IApplication>) => {
            state.currentApp = action.payload;
        },
        removeCurrentApp: (state) => {
            state.currentApp = null;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setMyApps, setCurrentApp, setIsFetching, removeCurrentApp } =
    appsSlice.actions;

export default appsSlice.reducer;
