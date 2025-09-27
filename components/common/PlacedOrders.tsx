"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../slices/productSlice";
import {
	clearOrders,
	OrderedProduct,
	removeOrder,
} from "../../slices/orderSlice";
import Image from "next/image";

const PlacedOrders = () => {
	const orders = useSelector((state: RootState) => state.orders.orders);

	const dispatch: AppDispatch = useDispatch();

	// useState
	const [content, setContent] = useState("cart");

	useEffect(() => {
		dispatch(fetchProducts(""));
	});

	console.log(orders);

	console.log(content);

	const purchaseItem = () => {
		console.log("Item purchased");
	};

	const renderOrders = () => {
		return orders?.map((order: OrderedProduct) => {
			return (
				<li
					key={order.uniqID}
					className="flex justify-around border-t-2 border-t-blue-300 p-3 my-5 min-h-[100px]"
				>
					<Image
						className="rounded-md"
						unoptimized
						priority
						src={order.image}
						alt={order.title}
						width={70}
						height={100}
					/>
					<div className="w-[55%] grid">
						<h2 className=" text-sm font-semibold opacity-80">{order.title}</h2>
						<p className="text-sm font-bold">${order.price}</p>
					</div>
					<div className="grid">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="red"
							className="size-5 justify-self-end cursor-pointer"
							onClick={() => dispatch(removeOrder(order))}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<button
							onClick={purchaseItem}
							className="w-[4em] h-5 text-sm text-white bg-blue-500 rounded-md self-end"
						>
							Order
						</button>
					</div>
				</li>
			);
		});
	};

	const displayContent = () => {
		if (content === "cart") {
			return (
				<div className="max-w-[500px] p-5 shadow-sm shadow-blue-500 rounded-lg">
					<div className="flex justify-between mb-3">
						<h2 className="text-md font-bold">My Cart</h2>
						<p
							onClick={() => dispatch(clearOrders())}
							className="text-sm text-red-500 underline cursor-pointer"
						>
							Clear All
						</p>
					</div>
					<ul>{renderOrders()}</ul>
				</div>
			);
		}

		if (content === "purchases") {
			return <div>My purchases</div>;
		}
	};

	return (
		<section className="px-4">
			<nav className="mb-4 flex justify-center space-x-5 text-white px-3">
				<button
					onClick={() => setContent("cart")}
					className="custom-bg-color px-2 min-w-[5em] h-[1.5em] rounded-md"
				>
					Cart
				</button>
				<button
					onClick={() => setContent("purchases")}
					className="custom-bg-color px-2 min-w-[5em] h-[1.5em] rounded-md"
				>
					Purchases
				</button>
			</nav>
			{displayContent()}
		</section>
	);
};

export default PlacedOrders;
