import React from "react";
import Header from "../components/Header";
import SearchFrom from "../components/SearchFrom";
import SearchTo from "../components/SearchTo";
import AirportData from "../airports.json";
import DepartDate from "../components/DepartDate";
import ReturnDate from "../components/ReturnDate";
import CabinClass from "../components/CabinClass";
import Travellers from "../components/Travellers";

function Home() {
	return (
		<div>
			<Header />
			<div className="flex gap-2 justify-center">
				<SearchFrom placeholder="Country/city" data={AirportData} />
				<SearchTo placeholder="Country/city" data={AirportData} />
				<DepartDate />
				<ReturnDate />
				<Travellers />
				<CabinClass />
			</div>
		</div>
	);
}

export default Home;
