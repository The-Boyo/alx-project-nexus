import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export interface Product {
	id: 4;
	title: string;
	slug: string;
	price: number;
	description: string;
	category: string;
	images: Array<string>;
	image: string;
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

export const fetchProducts = createAsyncThunk<Product[], string>(
	"products/fetchProducts",
	async (category: string) => {
		if (category.includes("all") || !category) {
			const response = await axios.get<Product[]>("");

			return response.data;
		} else {
			const response = await axios.get<Product[]>("", {
				params: {
					categorySlug: `${category}`,
				},
			});

			return response.data;
		}
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
