import { IApplication } from "@/types/application-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppStats {
    monthlyEarnings: number;
    uniqueUsers: number;
    chartData: {
        _id: string;
        value: number;
    }[];
}

interface IAppsState {
    apps: IApplication[];
    currentApp: IApplication | null;
    isFetching: boolean;
    currentAppStats: IAppStats | null;
}

const initialState: IAppsState = {
    apps: [],
    currentApp: null,
    currentAppStats: null,
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
        setCurrentAppStats: (state, action: PayloadAction<IAppStats>) => {
            state.currentAppStats = action.payload;
        },
    },
});

export const {
    setMyApps,
    setCurrentApp,
    setIsFetching,
    removeCurrentApp,
    setCurrentAppStats,
} = appsSlice.actions;

export default appsSlice.reducer;
