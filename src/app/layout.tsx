import Providers from "../../store/providers";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
