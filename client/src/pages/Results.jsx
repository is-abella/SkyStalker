import React from "react";
import { useLocation } from "react-router-dom";

function Results() {
	const location = useLocation();
	const fromInput = location.state?.fromInput || "";
	const toInput = location.state?.toInput || "";
	const departDate = location.state?.departDate || new Date();
	const formatDepartDate = `${departDate.getDate()}/${
		departDate.getMonth() + 1
	}/${departDate.getFullYear()}`;
	const returnDate = location.state?.returnDate || new Date();
	const formatReturnDate = `${returnDate.getDate()}/${
		returnDate.getMonth() + 1
	}/${returnDate.getFullYear()}`;
	const travellers = location.state?.travellers || 1;
	const cabinClass = location.state?.cabinClass || "Economy";
	const flightData = location.state?.flightData || {};

	return (
		<div>
			<h1>Results</h1>
			<div>From: {fromInput}</div>
			<div>To: {toInput}</div>
			<div>Depart: {formatDepartDate}</div>
			<div>Return: {formatReturnDate}</div>
			<div>Travellers: {travellers}</div>
			<div>Cabin class: {cabinClass}</div>
			<pre>{JSON.stringify(flightData, null, 2)}</pre>
		</div>
	);
}

export default Results;
