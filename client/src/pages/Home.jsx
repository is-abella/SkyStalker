import React, { useState } from "react";
import Header from "../components/Header";
import SearchFrom from "../components/SearchFrom";
import SearchTo from "../components/SearchTo";
import AirportData from "../airports-code.json";
import DepartDate from "../components/DepartDate";
import ReturnDate from "../components/ReturnDate";
import CabinClass from "../components/CabinClass";
import Travellers from "../components/Travellers";
import TripWay from "../components/TripWay";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
	const navigate = useNavigate();
	const [fromInput, setFromInput] = useState("");
	const [toInput, setToInput] = useState("");
	const [departDate, setDepartDate] = useState(new Date());
	const [returnDate, setReturnDate] = useState(new Date());
	const [travellers, setTravellers] = useState(1);
	const [cabinClass, setCabinClass] = useState("Economy");
	const [tripWay, setTripWay] = useState("Return");
	const [adults, setAdults] = useState(1);
	const [youths, setYouths] = useState(0);
	const [children, setChildren] = useState(0);
	const [toddlers, setToddlers] = useState(0);
	const [infants, setInfants] = useState(0);

	const cabinClassOptions = [
		{ value: "Economy", label: "Economy" },
		{ value: "Premium Economy", label: "Premium Economy" },
		{ value: "Business", label: "Business" },
		{ value: "First", label: "First" },
	];

	const tripWayOptions = [
		{ value: "One-way", label: "One-way" },
		{ value: "Return", label: "Return" },
	];

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
			margin-top: 20px;
		}

		.search:hover {
			background-color: rgba(208, 186, 248, 0.617);
		}
		</style>
  `;

	const handleSearch = () => {
		const departDateString = departDate.toLocaleDateString("en-GB");
		const returnDateString = returnDate.toLocaleDateString("en-GB");
		const requestBody = {
			fromInput,
			toInput,
			departDate: departDateString,
			returnDate: returnDateString,
			travellers,
			cabinClass,
			adults,
			youths,
			children,
			toddlers,
			infants,
			tripWay,
		};
		console.log("requestBody", requestBody);
		// Make a POST request to the backend endpoint
		fetch("http://localhost:3000/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		})
			.then((response) => response.json())
			.then((flightData) => {
				navigate("/results", {
					state: {
						fromInput: fromInput,
						toInput: toInput,
						departDate: departDate,
						returnDate: returnDate,
						travellers: travellers,
						cabinClass: cabinClass,
						adults: adults,
						youths: youths,
						children: children,
						toddlers: toddlers,
						infants: infants,
						tripWay: tripWay,
						flightData,
					},
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="home-background">
			<Header />
			<div dangerouslySetInnerHTML={{ __html: styleBlock }} />
			<div className="flex flex-col gap-2 justify-center shrink-0">
				<div className="row-1 flex justify-center gap-2">
					<TripWay
						tripWayOptions={tripWayOptions}
						selectedTripWay={tripWay}
						setTripWay={setTripWay}
					/>
					<Travellers
						setTravellers={setTravellers}
						setAdults={setAdults}
						setYouths={setYouths}
						setChildren={setChildren}
						setToddlers={setToddlers}
						setInfants={setInfants}
					/>
					<CabinClass
						cabinClassOptions={cabinClassOptions}
						selectedCabinClass={cabinClass}
						setCabinClass={setCabinClass}
					/>
				</div>
				<div className="row-2 flex justify-center gap-2">
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
					{tripWay === "Return" && (
						<ReturnDate setReturnDate={setReturnDate} minDate={departDate} />
					)}
					<div className="flex flex-col">
						<button
							className="search" // Add a class for the button
							onClick={handleSearch}
							>Search
						</button>
					</div>
				</div>
			</div>
			<div className="overlay-container">
				<div className="overlay-image">
					<img src="../images/overlay.jpeg" alt="Overlay" />
  				</div>
			</div>
		</div>
	);
}

export default Home;
