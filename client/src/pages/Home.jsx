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
import BeatLoader from "react-spinners/BeatLoader";

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
	const [loading, setLoading] = useState(false);

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

	const styles = {
		height: "42vh",
		backgroundImage: `linear-gradient( rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 10) 99%), url("/images/background.png")`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		zIndex: "1",
	};

	const handleSearch = () => {
		setLoading(true);

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
				setLoading(false);
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
				setLoading(false);
			});
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
		<div className="home-background">
			<div style={styles}>
				<Header />
			</div>
			<div dangerouslySetInnerHTML={{ __html: styleBlock }} />
			<div className="flex flex-col gap-2 justify-center shrink-0">
				{loading ? (
					<div className="loading">
						<div>Hang on tight while we're fetching your flights!</div>
						<BeatLoader
							loading={loading}
							color={"#c0bffb"}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<>
						<div className="row-1 flex gap-2 justify-center">
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
						<div className="row-2 flex gap-2 justify-center">
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
								<div className="label text-white">Search</div>
								<button className="search" onClick={handleSearch}>
									DISPLAY FLIGHTS
								</button>
							</div>
						</div>
					</>
				)}
			</div>
			<div className="blue-image" />
		</div>
	);
}

export default Home;
