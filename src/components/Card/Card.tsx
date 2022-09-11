export default function Card(props: { title: string; value: string; green?: boolean }) {
	const { title, value, green } = props;
	return (
		<div
			className="flex flex-col text-center gap-5 bg-transparent"
			style={{ boxShadow: "0px 0px 10px gray" }}>
			<h2 className="font-bold text-sm lg:text-md">{title}</h2>
			<p
				style={{
					color: green ? "green" : "black",
					fontWeight: green ? "bold" : "normal",
				}}
				className="text-sm lg:text-md">
				{value}
			</p>
		</div>
	);
}
