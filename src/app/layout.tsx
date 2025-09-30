import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import PathProvider from "../../contexts/PathContexts";
import Providers from "../../store/providers";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className="flex flex-col min-h-screen">
				<Providers>
					<PathProvider>
						<Header />
						{children}
						<Footer />
					</PathProvider>
				</Providers>
			</body>
		</html>
	);
}
