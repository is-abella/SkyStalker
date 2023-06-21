import React from "react";
import Header from "../components/Header";
import SearchFrom from "../components/SearchFrom";
import SearchTo from "../components/SearchTo";
import AirportData from "../airports.json";
import DepartDate from "../components/DepartDate";
import ReturnDate from "../components/ReturnDate";

function Home() {
	return (
		<div>
			<Header />
			<div className="flex gap-5 justify-center">
				<SearchFrom placeholder="Country/city" data={AirportData} />
				<SearchTo placeholder="Country/city" data={AirportData} />
				<DepartDate />
				<ReturnDate />
			</div>
		</div>
	);
}

export default Home;
