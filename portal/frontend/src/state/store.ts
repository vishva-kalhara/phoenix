import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import appsSlice from "./slices/apps-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        apps: appsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
