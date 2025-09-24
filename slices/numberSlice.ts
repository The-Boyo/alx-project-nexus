import { createSlice } from "@reduxjs/toolkit";

interface NumState {
	num: number;
	status: "idle" | "loading" | "failed" | "success";
}

const initialState: NumState = {
	num: 0,
	status: "idle",
};

const numSlice = createSlice({
	name: "num",
	initialState,
	reducers: {
		add(state, action) {
			state.num += action.payload;
		},
	},
});

export const { add } = numSlice.actions;

export default numSlice.reducer;
