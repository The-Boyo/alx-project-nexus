"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import mpesalogo from "../../public/assets/images/mpesa.png";
import airtel from "../../public/assets/images/airtel.png";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setPayStatus } from "../../slices/purchasedItemsSlice";

const PaymentMethod = () => {
	const [payMethod, setPayMethod] = useState("mpesa");
	const [mpesaVal, setMpesaVal] = useState("");
	const [airtelVal, setAirtelVal] = useState("");
	const [inputError, setInputError] = useState("");
	const [processing, setProcessing] = useState(false);

	const dispatch: AppDispatch = useDispatch();

	//Navigation
	const router = useRouter();

	useEffect(() => {
		dispatch(setPayStatus("idle"));
	});

	const phoneNumValidation = (val: string) => {
		if (!val) {
			setInputError("Please provide a phone number");
			return;
		}
		if (val.length > 10) {
			setInputError(`Remove ${val.length - 10} numbers`);
			return;
		}

		if (val.length < 10) {
			setInputError(`Add ${10 - val.length} numbers`);
			return;
		}

		setProcessing(true);
		setTimeout(() => {
			dispatch(setPayStatus("success"));
			router.replace("/orders");
		}, 1500);
	};

	const makePayment = () => {
		if (payMethod === "mpesa") {
			phoneNumValidation(mpesaVal);
		}

		if (payMethod === "airtel") {
			phoneNumValidation(airtelVal);
		}
	};

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

	if (processing) {
		return (
			<div>
				<h3 className="text-lg font-bold">
					Processing Payment
					<span className="animate-ping ml-2">.</span>
					<span className="animate-ping">.</span>
					<span className="animate-ping">.</span>
				</h3>
			</div>
		);
	}

	return (
		<>
			<h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
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
					<button
						onClick={() => makePayment()}
						className="bg-blue-600 px-1 text-white text-[12px] rounded-sm"
					>
						Done
					</button>
				</div>
				<p className="text-red-500 text-sm text-center">{inputError}</p>
			</div>
		</>
	);
};

export default PaymentMethod;
