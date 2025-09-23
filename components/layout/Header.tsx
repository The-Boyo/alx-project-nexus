const Header = () => {
	return (
		<header className="custom-bg-color h-[120px] flex space-x-6 items-center p-3 text-white sticky top-0 w-full shadow-md">
			<h2 className="text-3xl font-bold font-serif underline">
				G<span className="text-xl opacity-80">ikosh</span>
			</h2>
			<div className="w-[80%]">
				<input
					type="text"
					placeholder="Search Item..."
					className="border-2 border-white rounded-lg h-[2.5em] w-[80%] text-lg p-2 mr-3 text-white focus: outline-0"
				/>
				<button className="h-[2.5em] w-[6em] rounded-md cursor-pointer bg-black text-lg focus:bg-[rgba(0,0,0,.5)]">
					Search
				</button>
			</div>
		</header>
	);
};

export default Header;
