"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchProducts, Product } from "../../slices/productSlice";
import Image from "next/image";

export const shortenTitle = (title: string) => {
	const arr = title.split(" ");

	const newTitle: Array<string> = [];

	for (let i = 0; i < arr.length - 1; i++) {
		if (i < 5) {
			newTitle.push(arr[i]);
		} else {
			break;
		}
	}

	return newTitle.join(" ");
};

const ContentHome = () => {
	const { products, status, error } = useSelector(
		(state: RootState) => state.products
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts(""));
		}
	}, [status, dispatch]);

	console.log(products);

	const displayProducts = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log(event.currentTarget.className.split(" ")[1]);

		const productCategory = event.currentTarget.className.split(" ")[1];

		dispatch(fetchProducts(productCategory));
	};

	console.log(shortenTitle("Classic Navy Blue Baseball Cap"));

	const renderProducts = () => {
		if (status === "loading" || status === "idle")
			return <h2 className="text-3xl font-extrabold">Loading...</h2>;

		if (status === "failed")
			return <h3 className="text-red-500 text-xl">{error}</h3>;

		return (
			<ul className="grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1.5fr))]  gap-y-9 gap-x-5">
				{products?.map((product: Product) => {
					if (/[0-9]/.test(product.title)) {
						return null;
					}

					return (
						<li
							key={product.id}
							className="px-4 py-5 w-[200px] flex-cols hover:shadow-lg shadow-blue-500 rounded-lg"
						>
							<Image
								className="rounded-md mb-1"
								unoptimized
								priority
								src={product.images[0]}
								alt={product.title}
								width={100}
								height={120}
								style={{ height: "70%", width: "100%" }}
							/>
							<h2 className="mb-2 font-bold opacity-75 min-h-[20%]">
								{product.title}
							</h2>
							<div className="flex justify-between">
								<p className="font-bold text-lg ml-1">${product.price}</p>
								<button className="nav-btn">Add</button>
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<section className="flex-col p-2">
			<div className="sticky top-[100px] bg-white z-10">
				<h2 className="text-lg text-center pt-3 pb-5 mb-2 custom-blue-text font-bold">
					All in one MarketPlace
				</h2>
				<nav className="flex justify-around sticky top-[150px] space-x-4 m-2 pb-3 overflow-x-scroll md:overflow-x-hidden">
					<button className="nav-btn all" onClick={displayProducts}>
						All
					</button>
					<button className="nav-btn clothes" onClick={displayProducts}>
						Clothes
					</button>
					<button className="nav-btn shoes" onClick={displayProducts}>
						Shoes
					</button>
					<button className="nav-btn furniture" onClick={displayProducts}>
						Furniture
					</button>
					<button className="nav-btn electronics" onClick={displayProducts}>
						Electronics
					</button>
					<button className="nav-btn miscellaneous" onClick={displayProducts}>
						Miscellaneous
					</button>
					<button className="nav-btn others" onClick={displayProducts}>
						Others
					</button>
				</nav>
			</div>
			{renderProducts()}
		</section>
	);
};

export default ContentHome;
