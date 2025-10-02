import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface OrderedProduct extends Product {
	uniqID: string;
}

export interface OrdersState {
	orders: OrderedProduct[] | [];
}

const initialState: OrdersState = {
	orders: [],
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		placeOrder(state, action) {
			state.orders = [...state.orders, action.payload];
		},
		clearOrders(state) {
			state.orders = [];
		},
		removeOrder(state, action) {
			state.orders = state.orders.filter(
				(order) => order.uniqID !== action.payload.uniqID
			);
		},
	},
});

export const { placeOrder, clearOrders, removeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
