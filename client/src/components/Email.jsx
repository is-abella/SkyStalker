import React, { useState } from "react";
import "./Email.css";

function Email() {
	const [email, setEmail] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleTrackFlights = () => {};

	return (
		<div className="email">
			<div>
				Receive email alerts for this trip. We'll let you know if prices have changed.
			</div>
			<input
				type="email"
				value={email}
				onChange={handleEmailChange}
				placeholder="Enter your email address"
			/>
			<button className="search" onClick={handleTrackFlights}>
				TRACK FLIGHTS
			</button>
		</div>
	);
}

export default Email;
