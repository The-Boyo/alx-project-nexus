import React from "react";

const Footer = () => {
	return (
		<footer className="flex items-center justify-center h-[200px] custom-bg-color w-full text-center text-md font-bold py-3">
			Gikosh &copy; {new Date().getFullYear()}
		</footer>
	);
};

export default Footer;
