import React from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import "./Results.css";
import htmlConverter from "./htmlConverter.js";
import Header from "../components/Header";

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
	const tripWay = location.state?.tripWay || "One-way";
	const flightData = location.state?.flightData || [];
	const htmlString = htmlConverter(
		flightData,
		fromInput,
		toInput,
		tripWay,
		travellers,
		cabinClass
	);

	return (
		<div className="results">
			<div className="side">
				<Header />
				<h1>Your search</h1>
				<div className="inputs">
					<div>
						{fromInput} - {toInput}
					</div>
					<div>Depart: {formatDepartDate}</div>
					{tripWay === "Return" && <div>Return: {formatReturnDate}</div>}
					<div>Travellers: {travellers}</div>
					<div>Cabin class: {cabinClass}</div>
				</div>
			</div>
			<div className="flight-results">{ReactHtmlParser(htmlString)}</div>
			{/*<pre>{JSON.stringify(flightData, null, 2)}</pre>*/}
		</div>
	);
}

export default Results;
