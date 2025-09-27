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
import Link from "next/link";
import { addPurchase } from "../../slices/purchasedItemsSlice";

const PlacedOrders = () => {
	const orders = useSelector((state: RootState) => state.orders.orders);
	const { purchases } = useSelector((state: RootState) => state.purchases);

	const dispatch: AppDispatch = useDispatch();

	// useState
	const [content, setContent] = useState("cart");
	const [openModal, setModal] = useState(false);
	const [toBuy, setOrderToBuy] = useState<OrderedProduct | null>(null);

	useEffect(() => {
		dispatch(fetchProducts(""));
	});

	console.log(orders);
	console.log(toBuy);
	console.log(purchases);

	const purchaseItem = (
		event: React.MouseEvent<HTMLButtonElement>,
		order: OrderedProduct
	) => {
		setModal(true);
		setOrderToBuy(order);
	};

	const renderOrders = () => {
		if (orders.length < 1) {
			return (
				<Link href="/" className="text-blue-700 underline ">
					<h3>Click to shop</h3>
				</Link>
			);
		}

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
						style={{ height: "15%", width: "15%" }}
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
							onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
								purchaseItem(e, order)
							}
							className="w-[6em] h-8 text-sm text-white bg-blue-500 rounded-sm self-end"
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
				<div className="max-w-[500px] min-w-[250px] p-5 shadow-sm shadow-blue-500 rounded-lg">
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

	const productPurchased = async (
		e: React.MouseEvent<HTMLButtonElement>,
		item: OrderedProduct
	) => {
		console.log(e, item);
		const res = await dispatch(addPurchase(item));

		console.log(res);
	};

	return (
		<>
			<section className="px-4">
				<nav className="mb-4 flex justify-center space-x-5 text-white px-3">
					<button
						onClick={() => setContent("cart")}
						className={`custom-bg-color px-2 min-w-[5em] h-[1.7em] rounded-md text-sm ${
							content === "cart"
								? "shadow-md shadow-black border-b-1 border-b-black"
								: ""
						}`}
					>
						Cart
					</button>
					<button
						onClick={() => setContent("purchases")}
						className={`custom-bg-color px-2 min-w-[5em] h-[1.7em] rounded-md text-sm text-center ${
							content === "purchases"
								? "shadow-md shadow-black border-b-1 border-b-black"
								: ""
						}`}
					>
						Purchases
					</button>
				</nav>
				{displayContent()}
			</section>
			{openModal && toBuy && (
				<div className="flex justify-center items-center min-h-screen w-full fixed top-0 z-100 bg-[rgba(0,0,0,0.7)]">
					<div className="flex-col bg-white w-[80%] max-w-[400px] min-w-[250px] rounded-sm p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="black"
							className="size-5 justify-self-end cursor-pointer"
							onClick={() => {
								setModal(false);
								setOrderToBuy(null);
							}}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<Image
							className="rounded-md justify-self-center"
							unoptimized
							priority
							src={toBuy.image}
							alt={toBuy.title}
							width={120}
							height={120}
							style={{ height: "30%", width: "30%" }}
						/>
						<div className="justify-self-center flex-col px-2">
							<h2 className="mt-2 font-bold opacity-80 justify-self-center">
								{toBuy.title}
							</h2>
							<p className=" text-sm mt-2 mb-4 justify-self-center bg-black rounded-sm  text-white p-1">
								Type➡️ <span className="">{toBuy.category}</span>
							</p>
						</div>
						<div className="mb-4">
							<h4 className="italic underline text-sm font-bold">
								Description
							</h4>
							<p className="text-sm">{toBuy.description}</p>
						</div>
						<div className="flex justify-end space-x-3 px-3 text-white mb-1">
							<button
								onClick={(e) => productPurchased(e, toBuy)}
								className="text-md font-bold custom-bg-color rounded-md px-4 h-8 shadow-md shadow-black border-b-1 border-b-black"
							>
								Buy ${toBuy.price}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PlacedOrders;
