const Header = () => {
	return (
		<header className="custom-bg-color h-[100px] flex space-x-6 justify-around items-center p-3 text-white sticky top-0 w-full shadow-md z-10">
			<h2 className="text-3xl font-bold font-serif underline">
				G<span className="text-xl opacity-80">ikosh</span>
			</h2>
			<div className="w-[80%] sm:flex justify-center">
				<input
					type="text"
					placeholder="Search Item..."
					className="border-2 border-white rounded-lg h-[2.5em] w-[60%] text-sm p-2 mr-3 text-white focus: outline-0"
				/>
				<button className="h-[2.5em] w-[5em] rounded-md cursor-pointer bg-black text-sm focus:bg-[rgba(0,0,0,.5)]">
					Search
				</button>
			</div>
			<div className="grid grid-cols-2 gap-x-2 items-center auth">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
				<div className="grid items-center bg-white rounded-full h-8 w-8 text-black text-center font-bold text-lg cursor-pointer">
					E
				</div>
			</div>
		</header>
	);
};

export default Header;
