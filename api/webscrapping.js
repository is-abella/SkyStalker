import { Builder, By, Key, until } from "selenium-webdriver";
import puppeteer from "puppeteer";
/*
const sampleInputs = {
	fromInput: "SIN",
	toInput: "LAX",
	departDate: "29/07/2023", //Format as DDMMYYYY, departure only
	cabinClass: "First", //Format as "Economy", "Premium Economy", "Business" and "First"
	TripWay: "One-way", //Format as "One-way" or "Round"
	adults: 1,
	toddlers: 2,
	infants: 1,
	children: 1,
	youths: 1,
	customerEmail: "demeterrxy@gmail.com",
};*/

async function findCheapestFlights(flightInfo) {
	const driver = await new Builder().forBrowser("chrome").build();

	const leavingFrom = flightInfo.fromInput;
	const goingTo = flightInfo.toInput;
	const tripDate = flightInfo.departDate;
	const richness = flightInfo.cabinClass;
	const way = flightInfo.TripWay;
	const adultCount = flightInfo.adults;
	const toddlerCount = flightInfo.toddlers;
	const infantCount = flightInfo.infants;
	const childCount = flightInfo.children;
	const youthCount = flightInfo.youths;

	await driver.get("https://www.kayak.sg/flights");
	await driver.sleep(1000);

	//PEOPLE
	const people = '//div[@class="S9tW S9tW-pres-default"]';
	await driver.wait(until.elementLocated(By.xpath(people)), 5000).click();

	//adults
	const adultInc = '//button[@aria-label="Increment"]';
	if (adultCount > 1) {
		for (let i = 0; i < adultCount - 1; i++) {
			await driver.wait(until.elementLocated(By.xpath(adultInc)), 5000).click();
		}
	}

	//children
	const incButtons = await driver.findElements(By.xpath('//button[@aria-label="Increment"]'));
	const childInc = incButtons[3];
	for (let i = 0; i < childCount; i++) {
		await childInc.click();
	}

	//toddlers
	//const incButtons = await driver.findElements(By.xpath('//button[@aria-label="Increment"]'));
	const toddlerInc = incButtons[4];
	for (let i = 0; i < toddlerCount; i++) {
		await toddlerInc.click();
	}

	//infants
	const infantInc = incButtons[5];
	for (let i = 0; i < infantCount; i++) {
		await infantInc.click();
	}

	//youths
	const youthInc = incButtons[2];
	for (let i = 0; i < youthCount; i++) {
		await youthInc.click();
	}

	//close
	await driver.wait(until.elementIsVisible(driver.findElement(By.id("popover"))));
	await driver.actions().sendKeys(Key.ESCAPE).perform();

	//HANDLING CLASS
	const cabinClass = '//span[contains(.,"Economy")]';
	await driver.wait(until.elementLocated(By.xpath(cabinClass)), 5000).click();
	const cabinClassType = `//option[@aria-label="${richness}"]`;
	await driver.wait(until.elementLocated(By.xpath(cabinClassType)), 5000).click();
	await driver.sleep(1000);

	//REMOVE SG DEFAULT
	const remove = '//div[@aria-label="Remove"]';
	await driver.wait(until.elementLocated(By.xpath(remove)), 5000).click();
	await driver.sleep(1000);

	//LEAVING FROM
	const leavingFromXpath = '//input[@aria-label="Flight origin input"]';
	await driver
		.wait(until.elementLocated(By.xpath(leavingFromXpath)), 5000)
		.sendKeys(leavingFrom, Key.DOWN);
	const selectCountryDepart = '//div[@class="JyN0-name-container"]';
	await driver.wait(until.elementLocated(By.xpath(selectCountryDepart)), 5000).click();
	await driver.sleep(1000);

	//ONE WAY (OR ROUND?)
	const tripType = '//div[@class="wIIH-handle"]'; //2 elements with same xpath, notw for economy/business
	await driver.wait(until.elementLocated(By.xpath(tripType)), 5000).click();

	const wayType = `//option[@aria-label="${way}"]`; // ELSE, arialabel = "Return"
	await driver.wait(until.elementLocated(By.xpath(wayType)), 5000).click();
	await driver.sleep(1000);

	//GOING TO
	const destination = '//input[@aria-label="Flight destination input"]';
	await driver
		.wait(until.elementLocated(By.xpath(destination)), 5000)
		.sendKeys(goingTo, Key.DOWN);

	const selectCountryArrive = '//div[@class="JyN0-name-container"]';
	await driver.wait(until.elementLocated(By.xpath(selectCountryArrive)), 5000).click();
	await driver.sleep(1000);

	//TRANSFORMING DATE
	function formatDate(dateString) {
		const [day, month, year] = dateString.split("/");
		const date = new Date(`${month}/${day}/${year}`);

		const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
		const formattedDate = date.toLocaleDateString("en-US", options);
		const dateArray = formattedDate.split(",");
		const concatenatedString = dateArray.join("");
		const [weekday, monthName, dayNumber, yearNumber] = concatenatedString.split(" ");

		return `${weekday} ${dayNumber} ${monthName}, ${yearNumber}`;
	}

	//DATE
	const dmyString = formatDate(tripDate);

	//FINDING
	const dateBox = '//span[@aria-label="Start date calendar input"]';
	await driver.wait(until.elementLocated(By.xpath(dateBox)), 5000).click();
	await driver.sleep(1000);

	const prevMonth = '//button[@aria-label="Previous month"]';
	const nextMonth = '//button[@aria-label="Next month"]';
	const tripDateXpath = `//div[@aria-label="${dmyString}"]`;
	await driver.sleep(1000);

	//GO PREV MONTH FIRST AND FIND
	await driver.sleep(2000);
	await driver.wait(until.elementLocated(By.xpath(prevMonth)), 5000).click();

	//LOOP
	//Perhaps can have invalid date error if date entered < today's date
	let departingDateElement = "";

	while (departingDateElement === "") {
		try {
			departingDateElement = await driver.wait(
				until.elementLocated(By.xpath(tripDateXpath)),
				5000
			);
			await driver.sleep(1000);
			await departingDateElement.click();
		} catch (error) {
			departingDateElement = "";
			await driver.wait(until.elementLocated(By.xpath(nextMonth)), 5000).click();
			await driver.sleep(1000);
		}
	}

	//PRESS SEARCH
	const searchButton = '//button[@aria-label="Search"]';
	await driver.wait(until.elementLocated(By.xpath(searchButton)), 5000).click();
	await driver.sleep(2000);

	//SWITCH TO NEW TAB
	const handles = await driver.getAllWindowHandles();
	await driver.switchTo().window(handles[1]);

	//PRESS CHEAPEST
	const cheapestButton = '//div[@aria-label="Cheapest"]';
	await driver.wait(until.elementLocated(By.xpath(cheapestButton)), 7000).click();
	await driver.sleep(5000);
	const strUrl = await driver.getCurrentUrl();
	await driver.sleep(5000);

	//USING PUPPETEER
	async function puppetScrape() {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(strUrl);
		try {
			await page.waitForSelector(".nrc6", 5000);
		} catch (error) {
			console.error("No Flights Found");
		}
		await page.waitForSelector(".J0g6-operator-text");
		await page.waitForSelector(".JWEO-stops-text");
		await page.waitForSelector(".vmXl.vmXl-mod-variant-default");
		await page.waitForSelector(".f8F1-price-text");

		const data = await page.evaluate(function () {
			const flights = document.querySelectorAll(".nrc6");
			const array = [];
			const counter = flights.length < 10 ? flights.length : 10;
			for (i = 0; i < counter; i++) {
				array.push({
					flightTiming: flights[i].querySelector(".vmXl.vmXl-mod-variant-large")
						.innerText,
					airlines: flights[i].querySelector(".J0g6-operator-text").innerText,
					stops: flights[i].querySelector(".JWEO-stops-text").innerText,
					flightDuration: flights[i].querySelectorAll(".vmXl.vmXl-mod-variant-default")[1]
						.innerText,
					price: flights[i].querySelector(".f8F1-price-text").innerText,
				});
			}
			return array;
		});
		await browser.close();
		console.log(data);
		return data;
	}
	puppetScrape();
}

export { findCheapestFlights };
