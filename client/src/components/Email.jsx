import React, { useState } from "react";
import "./Email.css";

function Email({ flightInfo }) {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleTrackFlights = () => {
		const flightData = {
			...flightInfo,
			email,
		};

		fetch("http://localhost:3000/send-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(flightData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// Email sent successfully, do something here (e.g., show a success message)
					console.log("Email sent successfully");
				} else {
					// Some error occurred during email sending, handle it here
					console.error("Error sending email");
				}
			})
			.catch((error) => {
				console.error("Error sending email:", error);
				// Handle error if email sending fails
			});

		setSubmitted(true);
	};

	return (
		<div className="email">
			{!submitted ? (
				<>
					<div>
						Receive email alerts for this trip and we'll let you know if prices have
						changed.
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
				</>
			) : (
				<div>Check your inbox for updates soon!</div>
			)}
		</div>
	);
}

export default Email;
