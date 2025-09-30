"use client";

import Link from "next/link";
import Cart from "./Cart";
import { usePath } from "../../contexts/PathContexts";

const Header = () => {
	const { path } = usePath();

	return (
		<header
			className={`custom-bg-color h-[100px] flex space-x-6 justify-around items-center p-3 text-white sticky top-0 w-full shadow-md z-10 ${
				path.includes("payment") ? "hidden" : "flex"
			}`}
		>
			<Link href="/">
				<h2 className="text-xl sm:text-3xl font-bold font-serif underline">
					G<span className="text-xl opacity-80">ikosh</span>
				</h2>
			</Link>
			<div
				className={`w-[80%] sm:flex justify-center ${
					path === "/orders" ? "invisible" : "visible"
				}`}
			>
				<input
					type="text"
					placeholder="Search Item..."
					className="border-2 border-white rounded-lg h-[2.5em] w-[60%] text-sm p-2 mr-3 text-white focus: outline-0"
				/>
				<button className="h-[2.5em] w-[3.8em] rounded-md cursor-pointer bg-black text-sm focus:bg-[rgba(0,0,0,.5)]">
					Search
				</button>
			</div>
			<div className="grid grid-cols-2 gap-x-5 sm:gap-x-2 items-center mr-2 auth">
				<Cart />
				<div className="grid items-center bg-white rounded-full h-8 w-8 text-black text-center font-bold text-lg cursor-pointer">
					E
				</div>
			</div>
		</header>
	);
};

export default Header;
