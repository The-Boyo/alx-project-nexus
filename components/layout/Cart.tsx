"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";

const Cart = () => {
	const { orders } = useSelector((state: RootState) => state.orders);

	const router = useRouter();

	const displayNumOfOrders = () => {
		if (orders.length < 1) {
			return null;
		}

		return (
			<div className="justify-self-center mb-[-5px] h-4 w-4 rounded-full bg-black grid">
				<p className="self-center text-sm text-center text-[11px]">
					{orders.length}
				</p>
			</div>
		);
	};

	return (
		<div className="grid">
			{displayNumOfOrders()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-7 cursor-pointer"
				onClick={() => router.push("/orders")}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
				/>
			</svg>
		</div>
	);
};

export default Cart;
