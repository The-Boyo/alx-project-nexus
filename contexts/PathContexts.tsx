"use client";

import { createContext, useContext, useState } from "react";

interface PathContextType {
	path: string;
	setPath: (path: string) => void;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export default function PathProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [path, setPath] = useState("");

	return (
		<PathContext.Provider value={{ path, setPath }}>
			{children}
		</PathContext.Provider>
	);
}

export const usePath = () => {
	const context = useContext(PathContext);
	if (!context) {
		throw new Error("usePath must be use within a PathProvider");
	}

	return context;
};
