import { useEffect, useState } from "react";
import axios from "axios";
import { TIndicadores, TInputValues } from "../../types/dataType";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Simulador(props: { setResultData: any }) {
	const { setResultData } = props;
	const [indicadores, setIndicadores] = useState<TIndicadores[]>([]);
	const [rendimento, setRendimento] = useState<String>("bruto");
	const [indexacao, setIndexacao] = useState<String>("pre");

	async function getData() {
		const data = await axios.get("http://localhost:3000/indicadores");
		setIndicadores(data.data);
	}

	useEffect(() => {
		getData();
	}, []);

	const simulatorSchema = Yup.object().shape({
		rental: Yup.string(),
		initialAport: Yup.number().required(),
		deadline: Yup.number().required(),
		indexationTypes: Yup.string(),
		mensalAport: Yup.number().required(),
		rentability: Yup.number().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TInputValues>({ resolver: yupResolver(simulatorSchema) });

	const handleSimulationSubmit = async (values: TInputValues): Promise<void> => {
		const { indexationTypes, rental } = values;

		const data = await axios.get(
			`http://localhost:3000/simulacoes?tipoIndexacao=${indexationTypes}&tipoRendimento=${rental}`
		);

		setResultData(data);
	};

	const resetFields = () => {
		reset();
		setRendimento("bruto");
		setIndexacao("pre");
	};

	return (
		<div className="w-[90%] lg:pl-[50px] flex-1">
			<h2 className="font-bold text-lg sm:text-2xl m-auto mb-5 text-center lg:text-start">
				Simulador
			</h2>
			<form
				className="flex flex-col m-auto"
				action=""
				onSubmit={handleSubmit(handleSimulationSubmit)}>
				<div className="flex gap-8">
					<div className="mb-10 w-full max-w-[90%]">
						<p className="text-sm mb-3">Rendimento</p>
						<ul className="flex border-black border rounded w-fit justify-evenly items-center mb-10 overflow-hidden h-8">
							<li>
								<input
									type="radio"
									id="bruto"
									className="hidden peer"
									value="bruto"
									{...register("rental")}
									onClick={() => setRendimento("bruto")}
									defaultChecked
								/>
								<label
									htmlFor="bruto"
									className="peer-checked:bg-[#ED8E53] peer-checked:text-white w-full h-full cursor-pointer px-[5px] py-4 border-black border-r-[1px] flex text-sm hover:bg-[#eecdb9]">
									<img
										src="/check.svg"
										alt="check icon"
										className={`w-5 ${
											rendimento === "bruto" ? "block" : "hidden"
										}`}
									/>
									Bruto
								</label>
							</li>
							<li>
								<input
									type="radio"
									id="liquido"
									className="hidden peer"
									value="liquido"
									{...register("rental")}
									onClick={() => setRendimento("liquido")}
								/>
								<label
									htmlFor="liquido"
									className="peer-checked:bg-[#ED8E53] peer-checked:text-white cursor-pointer px-[5px] py-4 flex text-sm hover:bg-[#eecdb9]">
									<img
										src="/check.svg"
										alt="check icon"
										className={`w-5 ${
											rendimento === "liquido" ? "block" : "hidden"
										}`}
									/>
									Liquído
								</label>
							</li>
						</ul>

						<label
							htmlFor="inicial"
							className={`block mt-5 mb-3 text-sm ${
								errors.rentability ? "text-[#F00]" : "text-black"
							}`}>
							Aporte Inicial
						</label>
						<input
							type="text"
							className={`border-b-[1px] w-full sm:w-auto ${
								errors.initialAport ? "border-red-500" : null
							} border-black bg-transparent outline-none`}
							id="inicial"
							{...register("initialAport")}
						/>

						{errors.initialAport && (
							<div className="text-[#F00] text-[11px] mt-[5px]">
								Aporte inicial deve ser um número
							</div>
						)}

						<label
							htmlFor="prazo"
							className={`block mt-5 mb-3 text-sm ${
								errors.rentability ? "text-[#F00]" : "text-black"
							}`}>
							Prazo (em meses)
						</label>
						<input
							type="text"
							className={`border-b-[1px] w-full sm:w-auto ${
								errors.deadline ? "border-red-500" : null
							} border-black bg-transparent outline-none`}
							id="prazo"
							{...register("deadline")}
						/>

						{errors.deadline && (
							<div className="text-[#F00] text-[11px] mt-[5px]">
								Prazo deve ser um número
							</div>
						)}

						<label htmlFor="inicial" className="block mt-5 mb-3 text-sm">
							{indicadores[1]?.nome.toUpperCase()} (ao ano)
						</label>
						<input
							type="text"
							className="border-b-[1px] w-full sm:w-auto border-black bg-transparent"
							value={`${indicadores[1]?.valor}%`}
							disabled
						/>
					</div>
					<div className="mb-10 w-full">
						<p className="text-sm mb-3">Tipos de indexação</p>
						<ul className="flex border-black border rounded w-fit justify-evenly items-center mb-10 overflow-hidden h-8">
							<li>
								<input
									type="radio"
									id="pre"
									className="hidden peer"
									value="pre"
									defaultChecked
									{...register("indexationTypes")}
									onClick={() => setIndexacao("pre")}
								/>
								<label
									htmlFor="pre"
									className="peer-checked:bg-[#ED8E53] peer-checked:text-white w-full h-full cursor-pointer px-[5px] py-4 border-black border-r-[1px] flex text-sm hover:bg-[#eecdb9]">
									<img
										src="/check.svg"
										alt="check icon"
										className={`w-5 ${
											indexacao === "pre" ? "block" : "hidden"
										}`}
									/>
									PRÉ
								</label>
							</li>
							<li>
								<input
									type="radio"
									id="pos"
									className="hidden peer"
									value="pos"
									{...register("indexationTypes")}
									onClick={() => setIndexacao("pos")}
								/>
								<label
									htmlFor="pos"
									className="peer-checked:bg-[#ED8E53] peer-checked:text-white cursor-pointer px-[5px] py-4 flex border-black border-r-[1px] text-sm hover:bg-[#eecdb9]">
									<img
										src="/check.svg"
										alt="check icon"
										className={`w-5 ${
											indexacao === "pos" ? "block" : "hidden"
										}`}
									/>
									PÓS
								</label>
							</li>
							<li>
								<input
									type="radio"
									id="fixado"
									className="hidden peer"
									value="ipca"
									{...register("indexationTypes")}
									onClick={() => setIndexacao("ipca")}
								/>
								<label
									htmlFor="fixado"
									className="peer-checked:bg-[#ED8E53] peer-checked:text-white cursor-pointer px-[5px] py-4 flex text-sm hover:bg-[#eecdb9]">
									<img
										src="/check.svg"
										alt="check icon"
										className={`w-5 ${
											indexacao === "ipca" ? "block" : "hidden"
										}`}
									/>
									FIXADO
								</label>
							</li>
						</ul>

						<label
							htmlFor="inicial"
							className={`block mt-5 mb-3 text-sm ${
								errors.rentability ? "text-[#F00]" : "text-black"
							}`}>
							Aporte Mensal
						</label>
						<input
							type="text"
							className={`border-b-[1px] w-full sm:w-auto ${
								errors.mensalAport ? "border-red-500" : null
							} border-black bg-transparent outline-none`}
							id="inicial"
							{...register("mensalAport")}
						/>

						{errors.mensalAport && (
							<div className="text-[#F00] text-[11px] mt-[5px]">
								Aporte mensal deve ser um número
							</div>
						)}

						<label
							htmlFor="prazo"
							className={`block mt-5 mb-3 text-sm ${
								errors.rentability ? "text-[#F00]" : "text-black"
							}`}>
							Rentabilidade
						</label>
						<input
							type="text"
							className={`border-b-[1px] w-full sm:w-auto ${
								errors.rentability ? "border-red-500" : null
							} border-black bg-transparent outline-none`}
							id="prazo"
							{...register("rentability")}
						/>

						{errors.rentability && (
							<div className="text-[#F00] text-[11px] mt-[5px]">
								Rentabilidade deve ser um número
							</div>
						)}

						<label htmlFor="inicial" className="block mt-5 mb-3 text-sm">
							{indicadores[0]?.nome.toUpperCase()} (ao ano)
						</label>
						<input
							type="text"
							className="border-b-[1px] w-full sm:w-auto border-black bg-transparent"
							value={`${indicadores[0]?.valor}%`}
							disabled
						/>
					</div>
				</div>
				<div className="flex gap-8">
					<div
						className="border border-black rounded-lg py-3 w-full hover:bg-[#eecdb9] font-bold cursor-pointer text-center"
						onClick={() => resetFields()}>
						Limpar campos
					</div>
					<button
						type="submit"
						className="rounded-lg py-3 w-full bg-gray-400 hover:bg-[#ED8E53] font-bold">
						Simular
					</button>
				</div>
			</form>
		</div>
	);
}
