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
	//only for webscrapping part
	const [adults, setAdults] = useState(1);
	const [youths, setYouths] = useState(0);
	const [children, setChildren] = useState(0);
	const [toddlers, setToddlers] = useState(0);
	const [infants, setInfants] = useState(0);
	const TripWay = "One-way"; //no selection function for one-way/return yet

	const cabinClassOptions = [
		{ value: "Economy", label: "Economy" },
		{ value: "Premium Economy", label: "Premium Economy" },
		{ value: "Business", label: "Business" },
		{ value: "First", label: "First" },
	];

	const handleSearch = () => {
		console.log("Search clicked");
		// Prepare the request body
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
			TripWay,
		};
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
				// Handle the flight data received from the backend
				console.log(flightData);
				// Navigate to the results page or perform any other actions
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error(error);
			});
		/*
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
			},*/
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
				<button onClick={handleSearch}>Search</button>
			</div>
		</div>
	);
}

export default Home;
