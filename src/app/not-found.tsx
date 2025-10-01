import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex-1 grid items-center ">
			<div className="justify-self-center grid p-2 border-double border-3 border-black rounded-md">
				<h2 className="mb-4 text-2xl font-semibold">
					<span className="animate-bounce">😟</span> Page not found!{" "}
					<span className="animate-bounce">😟</span>
				</h2>
				<Link
					href={"/"}
					className="bg-blue-500 h-[1.7em] w-[7em] rounded-sm text-white text-center text-sm justify-self-center"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
}
