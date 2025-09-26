"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchProducts, Product } from "../../slices/productSlice";
import { clearOrders, removeOrder } from "../../slices/orderSlice";
import Image from "next/image";

const PlacedOrders = () => {
	const orders = useSelector((state: RootState) => state.orders.orders);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts(""));
	});

	console.log(orders);

	const renderOrders = () => {
		return orders?.map((order: Product) => {
			return (
				<li
					key={`${order.id}+${orders.length}`}
					className="flex justify-around shadow-sm shadow-blue-400 rounded-md p-3 my-5"
				>
					<Image
						className="rounded-md"
						unoptimized
						priority
						src={order.images[0]}
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
						<button className="w-[4em] h-5 text-sm text-white bg-blue-500 rounded-md self-end">
							Order
						</button>
					</div>
				</li>
			);
		});
	};

	return (
		<section className="max-w-[500px] w-[80%]  p-2 ">
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
		</section>
	);
};

export default PlacedOrders;
