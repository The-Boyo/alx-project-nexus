"use client";

import Image from "next/image";
import { useState } from "react";

import mpesalogo from "../../public/assets/images/mpesa.png";
import airtel from "../../public/assets/images/airtel.png";

const PaymentMethod = () => {
	const [payMethod, setPayMethod] = useState("mpesa");
	const [mpesaVal, setMpesaVal] = useState("");
	const [airtelVal, setAirtelVal] = useState("");

	const showCheckout = () => {
		if (payMethod === "airtel") {
			return (
				<>
					<label htmlFor="airtel-num">Airtel No:</label>
					<input
						type="tel"
						id="airtel-num"
						name="airtel"
						className="rounded-sm border-2 focus:outline-0 px-1"
						placeholder="0712345678"
						onChange={(e) => {
							const value = e.currentTarget.value.replace(/\D/g, "");
							setAirtelVal(value);
						}}
						value={airtelVal}
					/>
				</>
			);
		}

		return (
			<>
				<label htmlFor="mpesa-num">Mpesa No:</label>
				<input
					type="tel"
					id="mpesa-num"
					name="mpesa"
					className="rounded-sm border-2 focus:outline-0 px-1"
					placeholder="0712345678"
					onChange={(e) => {
						const value = e.currentTarget.value.replace(/\D/g, "");
						setMpesaVal(value);
					}}
					value={mpesaVal}
				/>
			</>
		);
	};

	return (
		<div className="rounded-md shadow-sm shadow-black min-w-[200px] p-3">
			<ul className="flex justify-around space-x-2 p-2 mb-4">
				<div>
					<Image
						onClick={() => setPayMethod("mpesa")}
						src={mpesalogo}
						alt="mpesa-logo"
						priority
						height={120}
						width={120}
						className={`${
							payMethod === "mpesa" ? "border-2 border-blue-600" : ""
						} rounded-md cursor-pointer`}
					/>
				</div>
				<div>
					<Image
						onClick={() => setPayMethod("airtel")}
						src={airtel}
						alt="airtel-logo"
						height={70}
						className={`${
							payMethod === "airtel" ? "border-2 border-blue-600" : ""
						} rounded-md cursor-pointer`}
					/>
				</div>
			</ul>
			<div className="px-3 py-2 text-sm flex justify-around space-x-2">
				{showCheckout()}
				<button className="bg-blue-600 px-1 text-white text-[12px] rounded-sm">
					Done
				</button>
			</div>
		</div>
	);
};

export default PaymentMethod;
