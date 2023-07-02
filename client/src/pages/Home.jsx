import React, { useState } from "react";
import Header from "../components/Header";
import SearchFrom from "../components/SearchFrom";
import SearchTo from "../components/SearchTo";
import AirportData from "../airports-code.json";
import DepartDate from "../components/DepartDate";
import ReturnDate from "../components/ReturnDate";
import CabinClass from "../components/CabinClass";
import Travellers from "../components/Travellers";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const [fromInput, setFromInput] = useState("");
	const [toInput, setToInput] = useState("");
	const [departDate, setDepartDate] = useState(new Date());
	const [returnDate, setReturnDate] = useState(new Date());
	const [travellers, setTravellers] = useState(1);
	const [cabinClass, setCabinClass] = useState("Economy");

	const cabinClassOptions = [
		{ value: "Economy", label: "Economy" },
		{ value: "Premium Economy", label: "Premium Economy" },
		{ value: "Business", label: "Business" },
		{ value: "First", label: "First" },
	];

	const handleSearch = () => {
		navigate("/results", {
			state: {
				fromInput: fromInput,
				toInput: toInput,
				departDate: departDate,
				returnDate: returnDate,
				travellers: travellers,
				cabinClass: cabinClass,
			},
		});
	};

	return (
		<div>
			<Header />
			<div className="flex gap-2 justify-center shrink-0">
				<SearchFrom
					placeholder="Country/city/airport code"
					data={AirportData}
					setFromInput={setFromInput}
				/>
				<SearchTo
					placeholder="Country/city/airport code"
					data={AirportData}
					setToInput={setToInput}
				/>
				<DepartDate setDepartDate={setDepartDate} minDate={new Date()} />
				<ReturnDate setReturnDate={setReturnDate} minDate={departDate} />
				<Travellers setTravellers={setTravellers} />
				<CabinClass
					cabinClassOptions={cabinClassOptions}
					selectedCabinClass={cabinClass}
					setCabinClass={setCabinClass}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
		</div>
	);
}

export default Home;
