"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { fetchProducts, Product } from "../../slices/productSlice";
import Image from "next/image";
import { placeOrder } from "../../slices/orderSlice";
import { generateUniqId } from "../../utils/utilities";
import { usePathname, useRouter } from "next/navigation";
import { usePath } from "../../contexts/PathContexts";
import Loader from "./Loader";

export const shortenTitle = (title: string, num: number) => {
	const allTitle = title.split(" ").join("");

	const oneLetterArray = allTitle.split("");

	const shortTitle: Array<string> = [];

	for (let i = 0; i <= oneLetterArray.length - 1; i++) {
		if (i <= num) {
			shortTitle.push(oneLetterArray[i]);
		} else break;
	}

	const addSpace: Array<string> = [];

	shortTitle.forEach((letter) => {
		if (letter === letter.toUpperCase()) {
			addSpace.push(" ", letter);
		} else {
			addSpace.push(letter);
		}
	});

	const newTitle = addSpace.join("");

	if (newTitle.includes(title)) {
		return newTitle;
	} else {
		return `${addSpace.join("")}...`;
	}
};

/**FUNCTIONAL COMPONENT */

const ContentHome = () => {
	const { products, status, error } = useSelector(
		(state: RootState) => state.products
	);

	const { orders } = useSelector((state: RootState) => state.orders);

	const [added, setAdded] = useState(false);
	const [addedOrderId, setOrderId] = useState("");

	const dispatch: AppDispatch = useDispatch();

	const router = useRouter();

	const addButtonRef = useRef(null);

	const pathname = usePathname();

	const { setPath } = usePath();

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts(""));
		}

		setPath(pathname);
	}, [status, dispatch, pathname, setPath]);

	const displayProducts = (event: React.MouseEvent<HTMLButtonElement>) => {
		const productCategory = event.currentTarget.className.split(" ")[1];

		dispatch(fetchProducts(productCategory));
	};

	const PlaceOrder = async (
		e: React.MouseEvent<HTMLButtonElement>,
		product: Product
	) => {
		const { id } = e.currentTarget.dataset;

		const res = await dispatch(
			placeOrder({ ...product, uniqID: generateUniqId() })
		);

		if (
			res.payload.title === product.title &&
			id === JSON.stringify(product.id)
		) {
			setAdded(true);
			setOrderId(id);
			setTimeout(() => {
				setAdded(false);
			}, 1000);
		}
	};

	const renderProducts = () => {
		if (status === "loading" || status === "idle") return <Loader />;

		if (status === "failed")
			return <h3 className="text-red-500 text-xl">{error}</h3>;

		return (
			<ul className="grid [grid-template-columns:repeat(auto-fill,_minmax(180px,_1.5fr))] gap-y-3 gap-x-2 sm:gap-y-9 sm:gap-x-5">
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
								src={product.image}
								alt={product.title}
								width={100}
								height={120}
								style={{ height: "60%", width: "80%" }}
							/>
							<h2 className="mb-2 font-bold opacity-75 min-h-[20%] h-[30%]">
								{shortenTitle(product.title, 35)}
							</h2>
							<div className="flex justify-between">
								<p className="font-bold text-lg ml-1">${product.price}</p>
								<button
									ref={addButtonRef}
									onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
										PlaceOrder(e, product)
									}
									className="nav-btn flex items-center justify-around"
									data-id={product.id}
								>
									{added && addedOrderId === JSON.stringify(product.id) ? (
										<>
											<p>Added</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="size-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
										</>
									) : (
										"Add"
									)}
								</button>
							</div>
						</li>
					);
				})}
				{orders.length < 1 ? null : (
					<button
						onClick={() => router.push("/orders")}
						className="bg-black fixed bottom-5 justify-self-center rounded-2xl py-2 px-3 text-white text-md font-semibold shadow-black shadow-md"
					>
						View Cart
					</button>
				)}
			</ul>
		);
	};

	return (
		<main className="flex-col flex-1 p-2">
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
		</main>
	);
};

export default ContentHome;
