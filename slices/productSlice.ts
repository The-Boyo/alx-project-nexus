import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export interface Product {
	id: 4;
	title: string;
	slug: string;
	price: number;
	description: string;
	category: {
		id: number;
		name: string;
		image: string;
		slug: string;
	};
	images: Array<string>;
}

interface ProductState {
	products: Product[];
	status: "idle" | "failed" | "success" | "loading";
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	status: "idle",
	error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
	"products/fetchProducts",
	async () => {
		const response = await axios.get("");

		return response.data;
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.status = "success";
		});

		builder.addCase(fetchProducts.pending, (state) => {
			state.status = "loading";
		});

		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message ?? "Something went wrong";
		});
	},
});

export default productSlice.reducer;
