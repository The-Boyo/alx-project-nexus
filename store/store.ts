import { configureStore } from "@reduxjs/toolkit";
import numReducer from "../slices/numberSlice";
import productsReducers from "../slices/productSlice";

export const store = configureStore({
	reducer: {
		num: numReducer,
		products: productsReducers,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
