import { useState } from "react";
import Resultado from "./components/Resultado/Resultado";
import Simulador from "./components/Simulador/Simulador";

function App() {
	const [resultData, setResultData] = useState([]);

	return (
		<div className="flex flex-col">
			<h1 className="text-center text-xl sm:text-3xl font-bold my-7">
				Simulador de Investimentos
			</h1>
			<div className="flex flex-col items-center lg:items-start lg:flex-row justify-center">
				<Simulador setResultData={setResultData} />
				<Resultado resultData={resultData} />
			</div>
		</div>
	);
}

export default App;
