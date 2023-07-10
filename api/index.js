//this is the main file?
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { findCheapestFlights } from "./searchFlights.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/search", (req, res) => {
	const userInput = req.body; // Assuming the user inputs are sent in the request body
	// Call the findCheapestFlights function with the user inputs
	findCheapestFlights(userInput)
		.then((flightData) => {
			// Send the flight data as the API response
			res.json(flightData);
		})
		.catch((error) => {
			// Handle any errors that occurred during the search
			res.status(500).json({ error: "An error occurred during the flight search" });
		});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
