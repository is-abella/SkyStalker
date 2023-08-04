import express from "express";
import cors from "cors";
import { findCheapestFlights } from "./searchFlights.js";
import startEmailAlerts from "./email.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/search", (req, res) => {
	try {
		const userInput = req.body;
		findCheapestFlights(userInput)
			.then((flightData) => {
				//const htmlString = htmlConverter(flightData, userInput.fromInput, userInput.toInput, userInput.tripWay, userInput.travellers, userInput.cabinClass);
				//res.send(htmlString);
				console.log(flightData);
				res.json(flightData);
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

app.post("/send-email", (req, res) => {
	try {
		const flightData = req.body;
		//console.log(flightData)
		startEmailAlerts(flightData)
			.then(() => {
				
				res.json({ success: true });
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "An error occurred during email sending" });
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred during email sending" });
	}
});
