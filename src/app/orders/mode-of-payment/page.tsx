import PaymentMethod from "../../../../components/common/PaymentMethod";

export default function PaymentMode() {
	return (
		<section className="flex-1 grid items-center justify-center">
			<div>
				<h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
				<PaymentMethod />
			</div>
		</section>
	);
}
