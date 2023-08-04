import React from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import "./Results.css";
import htmlConverter from "./htmlConverter.js";
import Header from "../components/Header";
import Email from "../components/Email";

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
	const adults = location.state?.adults;
	const youths = location.state?.youths;
	const children = location.state?.children;
	const toddlers = location.state?.toddlers;
	const infants = location.state?.infants;

	const htmlString = htmlConverter(
		flightData,
		fromInput,
		toInput,
		tripWay,
		travellers,
		cabinClass
	);

	const flightInfo = {
		fromInput,
		toInput,
		departDate: formatDepartDate,
		returnDate: formatReturnDate,
		travellers,
		cabinClass,
		tripWay,
		adults,
		youths,
		children,
		infants,
		toddlers,
	};

	const styles = {
		height: "42vh",
		backgroundImage: `linear-gradient( rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 10) 99%), url("/images/background.png")`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		zIndex: "1",
	};

	const styleBlock = `
	<style>
	.search {
		background-color: rgb(192, 191, 251);
		color: black;
		border: none;
		height: 36px;
		width: 170px;
		border-radius: 10px;
		font-weight: bold;
		cursor: pointer;
		margin-right: 8px;
		letter-spacing: 1px;
	}

	.search:hover {
		background-color: rgba(208, 186, 248, 0.617);
	}

	</style>
`;

	return (
		<div className="results-container">
			<div className="results" style={styles}>
				<div dangerouslySetInnerHTML={{ __html: styleBlock }} />
				<div className="side">
					<Header />
					<div className="inputs">
						<h1>
							<strong>Your search:</strong>
						</h1>
						<div className="fromandto">
							{fromInput} - {toInput}
						</div>
						<div>
							Date of Departure:{" "}
							<span className="depart-date">{formatDepartDate}</span>
						</div>
						{tripWay === "Return" && (
							<div>
								Date of Return:{" "}
								<span className="return-date">{formatReturnDate}</span>
							</div>
						)}
						<div>
							Travellers: <span className="travellercount">{travellers}</span>
						</div>
						<div>
							Cabin class: <span className="cabinclass">{cabinClass}</span>
						</div>
					</div>
					<Email flightInfo={flightInfo} />
				</div>
				<div className="flight-results">{parse(htmlString)}</div>
			</div>
			<div className="blue-image" />
		</div>
	);
}

export default Results;
