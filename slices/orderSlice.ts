import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

interface OrdersState {
	orders: Product[] | [];
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
				(order) => order.id !== action.payload.id
			);
		},
	},
});

export const { placeOrder, clearOrders, removeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
