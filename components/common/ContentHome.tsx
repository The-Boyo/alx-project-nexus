"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../../slices/productSlice";

const ContentHome = () => {
	const { products, status, error } = useSelector(
		(state: RootState) => state.products
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	console.log(products[0]);

	if (status === "loading" || status === "idle")
		return <h2 className="text-3xl font-extrabold">Loading...</h2>;

	if (status === "failed")
		return <h3 className="text-red-500 text-xl">{error}</h3>;

	return (
		<section className="border-red-500 border-solid">
			<h2 className="text-xl">All in one MarketPlace</h2>
		</section>
	);
};

export default ContentHome;
