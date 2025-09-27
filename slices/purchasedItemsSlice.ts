import { createSlice } from "@reduxjs/toolkit";
import { OrderedProduct } from "./orderSlice";

interface Purchases {
	purchases: OrderedProduct[] | [];
}

const initialState: Purchases = {
	purchases: [],
};

const purchasesSlice = createSlice({
	name: "purchases",
	initialState,
	reducers: {
		addPurchase(state, action) {
			state.purchases = [...state.purchases, action.payload];
		},
	},
});

export const { addPurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;
