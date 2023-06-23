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
	const adults = location.state?.adults || 1;
	const children = location.state?.children || 0;
	const cabinClass = location.state?.cabinClass || "Economy";

	return (
		<div>
			<h1>Results</h1>
			<div>From: {fromInput}</div>
			<div>To: {toInput}</div>
			<div>Depart: {formatDepartDate}</div>
			<div>Return: {formatReturnDate}</div>
			<div>Adults: {adults}</div>
			<div>Children: {children}</div>
			<div>Cabin class: {cabinClass}</div>
		</div>
	);
}

export default Results;
