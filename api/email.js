import util from "util";
import nodemailer from "nodemailer";
import { findCheapestFlights } from "./searchFlights.js";

let previousPrice = Infinity;
let isFirstEmail = true;

// Function to generate the email subject
function generateEmailSubject(drop, leaveFrom, goTo, currentPrice) {
	const priceString = `$${currentPrice.toFixed(2)}`;
	if (isFirstEmail) {
		return "Welcome to SkyStalker's email alerts!";
	} else if (drop) {
		const previousPriceString = `$${previousPrice.toFixed(2)}`;
		return `Flight from ${leaveFrom} to ${goTo}: ${previousPriceString} ➜ <s>${priceString}</s>`;
	} else {
		return `Flight from ${leaveFrom} to ${goTo}: cheapest flights currently`;
	}
}

async function sendEmail(sampleInputs) {
	console.log(sampleInputs);
	const leavingFrom = sampleInputs.fromInput;
	const goingTo = sampleInputs.toInput;
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "isabellarxy1@gmail.com",
			pass: "vehbboepxcvoctqp",
		},
	});

	const mailOptions = {
		from: "isabellarxy1@gmail.com",
		to: sampleInputs.email, //'demeterrxy@gmail.com',//, 'chanjieru2003@gmail.com'],
		subject: "",
		html: "",
	};

	const sendMail = util.promisify(transporter.sendMail).bind(transporter);

	try {
		const scrapedData = await findCheapestFlights(sampleInputs);
		console.log(scrapedData);

		const currentPrice = parseFloat(scrapedData[0].price.replace(/[^0-9.]/g, ""));
		const priceDrop = currentPrice < previousPrice;

		const emailSubject = generateEmailSubject(priceDrop, leavingFrom, goingTo, currentPrice);

		const emailContent = scrapedData.map((flight) => {
			let content = `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; text-align: left;">
        <p><strong>Airlines:</strong> ${flight.airlines}</p>
        <p><strong>Price:</strong> ${flight.price}</p>
        <hr>`;

			if (sampleInputs.TripWay === "Return") {
				content += `
          <p><strong>Going to:</strong></p>
          <p><strong>Stops:</strong> ${flight.goingToDetails.stops}</p>
          <p><strong>Flight Timing:</strong> ${flight.goingToDetails.flightTiming}</p>
          <p><strong>Flight Duration:</strong> ${flight.goingToDetails.flightDuration}</p>
          <hr>
          <p><strong>Coming back:</strong></p>
          <p><strong>Stops:</strong> ${flight.comingBackDetails.stops}</p>
          <p><strong>Flight Timing:</strong> ${flight.comingBackDetails.flightTiming}</p>
          <p><strong>Flight Duration:</strong> ${flight.comingBackDetails.flightDuration}</p>
          <hr>`;
			} else {
				content += `
          <p><strong>Flight Timing:</strong> ${flight.flightTiming}</p>
          <p><strong>Stops:</strong> ${flight.stops}</p>
          <p><strong>Flight Duration:</strong> ${flight.flightDuration}</p>
          <hr>`;
			}
			content += "</div>";
			return content;
		});

		let greeting = "";
		if (isFirstEmail) {
			greeting = `<h2>Hi user,</h2>
                  <p>Thank you for subscribing to our email alerts.
                  Here are some of the cheapest flight options currently available for your selected flight:</p>`;
			isFirstEmail = false;
		} else {
			const priceDifference = previousPrice - currentPrice;
			if (priceDrop) {
				greeting = `<h2>Hi user,</h2>
                    <p>The price of your chosen flight has decreased by $${priceDifference.toFixed(
						2
					)}.
                    Here are the current cheapest flight options available:</p>`;
			} else {
				greeting = `<h2>Hi user,</h2>
                    <p>The prices of your preferred flight have not decreased so far.
                    Below are a few of the cheapest flight options we currently have:</p>`;
			}
		}

		mailOptions.subject = emailSubject;
		mailOptions.html = `<div style="font-family: Arial, sans-serif;">${greeting}${emailContent.join(
			""
		)}</div>`;

		const info = await sendMail(mailOptions);
		console.log("Email sent: " + info.response);

		if (priceDrop) {
			previousPrice = currentPrice;
		}
	} catch (error) {
		console.log(error);
	}
}
/*
const testing = {
    fromInput: 'PEN',
    toInput: 'XMN',
    departDate: '29/07/2023',
    returnDate: '26/07/2023',
    travellers: 2,
    cabinClass: 'Business',
    adults: 1,
    youths: 1,
    children: 0,
    toddlers: 0,
    infants: 0,
    tripWay: 'One-way',
    email:'demeterrxy@gmail.com'
}
sendEmail(testing);*/

const intervalId = setInterval(sendEmail, 5 * 60 * 1000); //sends every 6h

setTimeout(() => {
	clearInterval(intervalId); // Stop the interval
	console.log("Email sending stopped after 42 Hours.");
}, 8 * 6 * 60 * 60 * 1000);

export default sendEmail;
