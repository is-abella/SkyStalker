import React, { useState } from "react";
import Header from "../components/Header";
import SearchFrom from "../components/SearchFrom";
import SearchTo from "../components/SearchTo";
import AirportData from "../airports.json";
import DepartDate from "../components/DepartDate";
import ReturnDate from "../components/ReturnDate";
import CabinClass from "../components/CabinClass";
import Travellers from "../components/Travellers";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const [fromInput, setFromInput] = useState("");
	const [toInput, setToInput] = useState("");

	const handleSearch = () => {
		navigate("/results", { state: { fromInput: fromInput, toInput: toInput } });
	};

	return (
		<div>
			<Header />
			<div className="flex gap-2 justify-center">
				<SearchFrom
					placeholder="Country/city"
					data={AirportData}
					setFromInput={setFromInput}
				/>
				<SearchTo placeholder="Country/city" data={AirportData} setToInput={setToInput} />
				<DepartDate />
				<ReturnDate />
				<Travellers />
				<CabinClass />
				<button onClick={handleSearch}>Search</button>
			</div>
		</div>
	);
}

export default Home;
