//this is the main file?
import express from "express";
import cors from "cors";
import { findCheapestFlights } from "./searchFlights.js";
//import htmlConverter from "../client/src/pages/htmlConverter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", (req, res) => {
	try {
		const userInput = req.body;
		console.log("index.js:", userInput);
		findCheapestFlights(userInput)
			.then((flightData) => {
				//const htmlString = htmlConverter(flightData, userInput.fromInput, userInput.toInput, userInput.tripWay, userInput.travellers, userInput.cabinClass);
				//res.send(htmlString);
				res.json(flightData);
				console.log("findcheapflights ran");
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "An error occurred during the flight search one" });
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred during the flight search two" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
