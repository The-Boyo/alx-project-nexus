"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ContentHome = () => {
	const { num, status } = useSelector((state: RootState) => state.num);

	const dispatch = useDispatch();

	console.log(num);

	return <section>This is the content page</section>;
};

export default ContentHome;
