import { createSlice } from "@reduxjs/toolkit";
import { OrderedProduct } from "./orderSlice";

interface Purchases {
	purchases: OrderedProduct[] | [];
	payStatus: "success" | "failed" | "idle";
}

const initialState: Purchases = {
	purchases: [],
	payStatus: "idle",
};

const purchasesSlice = createSlice({
	name: "purchases",
	initialState,
	reducers: {
		addPurchase(state, action) {
			if (action.payload === null) state.purchases = [...state.purchases];
			state.purchases = [...state.purchases, action.payload];
		},
		setPayStatus(state, action) {
			state.payStatus = action.payload;
		},
	},
});

export const { addPurchase, setPayStatus } = purchasesSlice.actions;

export default purchasesSlice.reducer;
