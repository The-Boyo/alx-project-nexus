import { configureStore } from "@reduxjs/toolkit";
import numReducer from "../slices/numberSlice";
import productsReducers from "../slices/productSlice";
import ordersReducers from "../slices/orderSlice";
import purchasesReducer from "../slices/purchasedItemsSlice";

export const store = configureStore({
	reducer: {
		num: numReducer,
		products: productsReducers,
		orders: ordersReducers,
		purchases: purchasesReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
