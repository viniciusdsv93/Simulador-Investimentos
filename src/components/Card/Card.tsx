export default function Card(props: {
	title: string
	value: string
	green?: boolean
}) {
	const { title, value, green } = props
	return (
		<div
			className='flex flex-col text-center gap-5 bg-transparent'
			style={{ boxShadow: '0px 0px 10px gray' }}
		>
			<h2 className='font-bold text-sm lg:text-md'>{title}</h2>
			<p
				className={`text-sm lg:text-md ${
					green ? 'text-[#008000] font-bold' : 'text-black font-normal'
				}`}
			>
				{value}
			</p>
		</div>
	)
}
