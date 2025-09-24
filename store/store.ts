import { configureStore } from "@reduxjs/toolkit";
import numReducer from "../slices/numberSlice";

export const store = configureStore({
	reducer: {
		num: numReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
