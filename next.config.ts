import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
			{ protocol: "https", hostname: "placehold.co" },
			{ protocol: "https", hostname: "placeimg.com" },
			{
				protocol: "https",
				hostname: "**", // allow all hosts
			},
		],
	},
};

export default nextConfig;
