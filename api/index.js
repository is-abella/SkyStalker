//this is the main file?
import express from "express";
import cors from "cors";
import { findCheapestFlights } from "./searchFlights.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", (req, res) => {
	try {
		const userInput = req.body;
		console.log("index.js:", userInput);
		findCheapestFlights(userInput)
			.then((flightData) => {
				res.json(flightData);
				console.log("findcheapflights ran");
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "An error occurred during the flight search" });
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred during the flight search" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
