import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

export default function Resultado(props: { resultData: any }) {
	const { resultData } = props;
	const [initialValueWithContribution, setInitialValueWithContribution] = useState(0);
	const [finalValueWithContribution, setFinalValueWithContribution] = useState(0);
	const [initialValueWithoutContribution, setInitialValueWithoutContribution] =
		useState(0);
	const [finalValueWithoutContribution, setFinalValueWithoutContribution] = useState(0);

	useEffect(() => {
		if (resultData?.data?.length > 0) {
			setInitialValueWithContribution(
				Math.round(
					Object.values(
						resultData?.data[0]?.graficoValores?.comAporte
					)[0] as number
				)
			);
			setFinalValueWithContribution(
				Math.round(
					Object.values(
						resultData?.data[0]?.graficoValores?.comAporte
					)[10] as number
				)
			);
			setInitialValueWithoutContribution(
				Math.round(
					Object.values(
						resultData?.data[0]?.graficoValores?.semAporte
					)[0] as number
				)
			);
			setFinalValueWithoutContribution(
				Math.round(
					Object.values(
						resultData?.data[0]?.graficoValores?.semAporte
					)[10] as number
				)
			);
		}
	}, [resultData]);

	return (
		<div className={`w-full ${resultData?.length <= 0 ? "opacity-0" : null}`}>
			<h2 className="font-bold text-lg sm:text-2xl w-[70%] m-auto mb-10 text-center lg:text-start mt-8 lg:mt-0">
				Resultado da Simulação
			</h2>
			<div className="flex flex-col w-[90%] sm:w-[70%] md:w-[50%] lg:w-[70%] m-auto">
				<div className="grid grid-cols-3 gap-5 mb-5">
					{resultData?.data?.length > 0 && (
						<>
							<Card
								title={"Valor final Bruto"}
								value={`R$ ${resultData.data[0].valorFinalBruto.toFixed(
									2
								)}`}
							/>
							<Card
								title={"Alíquota do IR"}
								value={`${resultData.data[0].aliquotaIR}%`}
							/>
							<Card
								title={"Valor Pago em IR"}
								value={`R$ ${resultData.data[0].valorPagoIR.toFixed(2)}`}
							/>
							<Card
								title={"Valor Final Líquido"}
								value={`R$ ${resultData.data[0].valorFinalLiquido.toFixed(
									2
								)}`}
								green={true}
							/>
							<Card
								title={"Valor Total Investido"}
								value={`R$ ${resultData.data[0].valorTotalInvestido.toFixed(
									2
								)}`}
							/>
							<Card
								title={"Ganho Líquido"}
								value={`R$ ${resultData.data[0].ganhoLiquido.toFixed(2)}`}
								green={true}
							/>
						</>
					)}
				</div>
				<div className="w-full flex flex-col">
					<h2 className="font-bold text-md lg:text-start text-center">
						Projeção de valores
					</h2>
					<div
						className={`flex justify-between items-end gap-2 h-[100px] mb-4`}>
						{resultData?.data?.length > 0 && (
							<>
								{Object.entries(
									resultData?.data[0]?.graficoValores?.comAporte
								).map((item, index) => {
									return (
										<Tippy
											content={`R$ ${Number(item[1]).toFixed(2)}`}>
											<div
												key={index}
												style={{
													backgroundColor: "#ED8E53",
													width: "40px",
													height:
														index == 0
															? "5px"
															: `${
																	((Number(item[1]) -
																		initialValueWithContribution) /
																		(finalValueWithContribution -
																			initialValueWithContribution)) *
																	100
															  }%`,
												}}></div>
										</Tippy>
									);
								})}
							</>
						)}
					</div>
					<div className={`flex justify-between items-end gap-2 h-[40px]`}>
						{resultData?.data?.length > 0 && (
							<>
								{Object.entries(
									resultData?.data[0]?.graficoValores?.semAporte
								).map((item, index) => {
									return (
										<Tippy
											content={`R$ ${Number(item[1]).toFixed(2)}`}>
											<div
												key={index}
												style={{
													backgroundColor: "black",
													width: "40px",
													height:
														index == 0
															? "2px"
															: `${
																	((Number(item[1]) -
																		initialValueWithoutContribution) /
																		(finalValueWithoutContribution -
																			initialValueWithoutContribution)) *
																	100
															  }%`,
												}}></div>
										</Tippy>
									);
								})}
							</>
						)}
					</div>
					<div className={`flex justify-between items-end gap-2 h-[40px]`}>
						{resultData?.data?.length > 0 && (
							<>
								{Object.entries(
									resultData?.data[0]?.graficoValores?.semAporte
								).map((item, index) => {
									return (
										<div key={index} className="w-[40px] text-center">
											{index}
										</div>
									);
								})}
							</>
						)}
					</div>
					<p className="text-center text-xs">Tempo (meses)</p>
					<p className="text-center text-xs -rotate-90 relative right-[52%] bottom-32">
						Valor (R$)
					</p>
					<div className="flex justify-center gap-8 my-8">
						<div className="flex gap-2">
							<div className="bg-[#ED8E53] w-[20px] h-[20px] rounded-full"></div>
							<p className="text-sm">Com aporte</p>
						</div>
						<div className="flex gap-2">
							<div className="bg-black w-[20px] h-[20px] rounded-full"></div>
							<p className="text-sm">Sem aporte</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
