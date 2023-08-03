import { Builder, By, Key, until } from "selenium-webdriver";
import puppeteer from "puppeteer";

async function findCheapestFlights(flightInfo) {
    
  const driver = await new Builder()
      .forBrowser('chrome')
      .build();

  const leavingFrom = flightInfo.fromInput;
  const goingTo = flightInfo.toInput;
  const tripDate = flightInfo.departDate;
  const returnDate = flightInfo.returnDate;
  const richness = flightInfo.cabinClass;
  const way = flightInfo.tripWay;
  const adultCount = flightInfo.adults;
  const toddlerCount = flightInfo.toddlers;
  const infantCount = flightInfo.infants;
  const childCount = flightInfo.children;
  const youthCount = flightInfo.youths;
  const travelNo = flightInfo.travellers;

  await driver.get('https://www.kayak.sg/flights');
  await driver.sleep(1000);

  //PEOPLE
  const people = '//div[@class="S9tW S9tW-pres-default"]';
  await driver.wait(until.elementLocated(By.xpath(people)), 7000).click();

  //adults
  const adultInc = '//button[@aria-label="Increment"]'
  if (adultCount > 1) {
    for (let i=0; i<adultCount-1 ; i++) {
      await driver.wait(until.elementLocated(By.xpath(adultInc)), 5000).click();
    }
  } 

  //children
  const incButtons = await driver.findElements(By.xpath('//button[@aria-label="Increment"]'));
  const childInc = incButtons[3];
  for (let i=0; i<childCount; i++) {
    await childInc.click();
  }

  //toddlers
  //const incButtons = await driver.findElements(By.xpath('//button[@aria-label="Increment"]'));
  const toddlerInc = incButtons[4];
  for (let i=0; i<toddlerCount; i++) {
    await toddlerInc.click();
  }

  //infants
  const infantInc = incButtons[5];
  for (let i=0; i<infantCount; i++) {
    await infantInc.click();
  }

  //youths 
  const youthInc = incButtons[2];
  for (let i=0; i<youthCount; i++) {
    await youthInc.click();
  }
  //close
  await driver.sleep(1000);
  await driver.actions().sendKeys(Key.ESCAPE).perform();

  
  //HANDLING CLASS
  const cabinClass = '//span[contains(.,"Economy")]';
  await driver.wait(until.elementLocated(By.xpath(cabinClass)), 5000).click();
  const cabinClassType = `//option[@aria-label="${richness}"]`;
  await driver.wait(until.elementLocated(By.xpath(cabinClassType)), 5000).click();
  //await driver.sleep(1000);

  //REMOVE SG DEFAULT
  const remove = '//div[@aria-label="Remove"]';
  await driver.wait(until.elementLocated(By.xpath(remove)), 5000).click();
  //await driver.sleep(1000);

  //LEAVING FROM
  const leavingFromXpath = '//input[@aria-label="Flight origin input"]';
  await driver.wait(until.elementLocated(By.xpath(leavingFromXpath)), 5000).sendKeys(leavingFrom,Key.DOWN);
  const selectCountryDepart = '//div[@class="JyN0-name-container"]'
  await driver.wait(until.elementLocated(By.xpath(selectCountryDepart)), 5000).click();
  //await driver.sleep(1000);

  //RETURN OR ONE WAY
  const tripType = '//div[@class="wIIH-handle"]' //2 elements with same xpath, notw for economy/business
  await driver.wait(until.elementLocated(By.xpath(tripType)), 5000).click();

  const wayType = `//option[@aria-label="${way}"]` 
  await driver.wait(until.elementLocated(By.xpath(wayType)), 5000).click();
  //await driver.sleep(1000);

  //GOING TO 
  const destination = '//input[@aria-label="Flight destination input"]';
  await driver.wait(until.elementLocated(By.xpath(destination)), 5000).sendKeys(goingTo,Key.DOWN);

  const selectCountryArrive = '//div[@class="JyN0-name-container"]'
  await driver.wait(until.elementLocated(By.xpath(selectCountryArrive)), 5000).click();
  //await driver.sleep(1000);
  

  //TRANSFORMING DATE
  function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${month}/${day}/${year}`);
    
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const dateArray = formattedDate.split(',');
    const concatenatedString = dateArray.join('');
    const [weekday, monthName, dayNumber, yearNumber] = concatenatedString.split(" ");
  
    return `${weekday} ${dayNumber} ${monthName}, ${yearNumber}`;
  }

  //DEPARTING 
  const dmyStringDepart = formatDate(tripDate); // date
  const startDateBox = '//span[@aria-label="Start date calendar input"]';
  await driver.wait(until.elementLocated(By.xpath(startDateBox)), 5000).click();
  //await driver.sleep(1000);
  
  const prevMonth = '//button[@aria-label="Previous month"]';
  const nextMonth = '//button[@aria-label="Next month"]';
  const tripDateXpath=`//div[@aria-label="${dmyStringDepart}"]`; 
  //await driver.sleep(1000);

  //GO PREV MONTH FIRST AND FIND
  await driver.sleep(1000);
  await driver.wait(until.elementLocated(By.xpath(prevMonth)), 5000).click();
  
  //LOOP
  let departingDateElement = '';

  while (departingDateElement === '') {
    try {
      departingDateElement = await driver.wait(until.elementLocated(By.xpath(tripDateXpath)), 5000);
      await driver.sleep(1000);
      await departingDateElement.click();
    } catch (error) {
      departingDateElement = '';
      await driver.wait(until.elementLocated(By.xpath(nextMonth)), 5000).click();
      await driver.sleep(1000);
    }
  }

  //ARRIVAL & COME BACK
  if (way === 'Return') {
    const dmyStringArrive = formatDate(returnDate);
    const endDateBox = '//span[@aria-label="End date calendar input"]';
    await driver.wait(until.elementLocated(By.xpath(endDateBox)), 5000).click();
    await driver.sleep(1000);

    const returnDateXpath = `//div[@aria-label="${dmyStringArrive}"]`;
    await driver.wait(until.elementLocated(By.xpath(prevMonth)), 5000).click();

    let arrivalDateElement = '';

    while (arrivalDateElement === '') {
      try {
        arrivalDateElement = await driver.wait(until.elementLocated(By.xpath(returnDateXpath)), 5000);
        await driver.sleep(1000);
        await arrivalDateElement.click();
      } catch (error) {
        arrivalDateElement = '';
        await driver.wait(until.elementLocated(By.xpath(nextMonth)), 5000).click();
        await driver.sleep(1000);
      }
    }
  }

  //PRESS SEARCH
  const searchButton = '//button[@aria-label="Search"]';
  await driver.wait(until.elementLocated(By.xpath(searchButton)), 5000).click();
  await driver.sleep(1000);

  //SWITCH TO NEW TAB
  const handles = await driver.getAllWindowHandles();
  await driver.sleep(5000);
  await driver.switchTo().window(handles[1]);

  //PRESS CHEAPEST
  await driver.sleep(2000);
  const cheapestButton = '//div[@aria-label="Cheapest"]';
  await driver.wait(until.elementLocated(By.xpath(cheapestButton)), 7000).click();
  await driver.sleep(5000);
  const strUrl = await driver.getCurrentUrl();


  
  //USING PUPPETEER 
  async function puppetScrape(flightWay) {
      const browser = await puppeteer.launch({headless : false}); 
      const page = await browser.newPage();
      await page.goto(strUrl);
      await new Promise(resolve => setTimeout(resolve, 3000));

      try {
        await page.waitForSelector('.nrc6', 5000);
      } catch (error) {
        console.error("No Flights Found");
        browser.close();
        return;
      }

      await page.waitForSelector('.J0g6-operator-text');
      await page.waitForSelector('.JWEO-stops-text');
      await page.waitForSelector('.vmXl.vmXl-mod-variant-default');
      await page.waitForSelector('.f8F1-price-text');
      await page.waitForSelector('.Iqt3-mod-stretch');
      await page.waitForSelector('img');
  
      const data = await page.$$eval('.nrc6', (flights, flightWay) => {
          //const flights = document.querySelectorAll('.nrc6'); 
          const array = [];
          const counter = flights.length < 5 ? flights.length : 5; 
          for (i=0; i<counter; i++) {    
            if (flightWay === 'Return') {

              //const imgElement = flights[i].querySelectorAll('img');

              const goThere = {
                stops: flights[i].querySelectorAll('.JWEO-stops-text')[0].innerText,
                flightTiming: flights[i].querySelectorAll('.vmXl.vmXl-mod-variant-large')[0].innerText,
                flightDuration: flights[i].querySelectorAll('.vmXl.vmXl-mod-variant-default')[1].innerText,
                //imgLinkOne: imgElement[1].getAttribute('src'),
                //imgLinkTwo: imgElement[2].getAttribute('src'),
              }
              const comeBack = {
                stops: flights[i].querySelectorAll('.JWEO-stops-text')[1].innerText,
                flightTiming: flights[i].querySelectorAll('.vmXl.vmXl-mod-variant-large')[1].innerText,
                flightDuration: flights[i].querySelectorAll('.vmXl.vmXl-mod-variant-default')[3].innerText,
                //imgLinkOne: imgElement[4].getAttribute('src'),
                //imgLinkTwo: imgElement[5].getAttribute('src'),
              }
              array.push({
                  link: flights[i].querySelector('.Iqt3-mod-stretch').href,
                  airlines: flights[i].querySelector('.J0g6-operator-text').innerText,
                  price: flights[i].querySelector('.f8F1-price-text').innerText,
                  goingToDetails : goThere,
                  comingBackDetails : comeBack,
              })
            } else {
              //const imgElement = flights[i].querySelectorAll('img');
              array.push({
                link: flights[i].querySelector('.Iqt3-mod-stretch').href,
                flightTiming: flights[i].querySelector('.vmXl.vmXl-mod-variant-large').innerText,
                airlines: flights[i].querySelector('.J0g6-operator-text').innerText,
                stops: flights[i].querySelector('.JWEO-stops-text').innerText,
                flightDuration: flights[i].querySelectorAll('.vmXl.vmXl-mod-variant-default')[1].innerText,
                price: flights[i].querySelector('.f8F1-price-text').innerText,
                //imgLinkOne: imgElement[0].getAttribute('src'),
                //imgLinkTwo: imgElement[1].getAttribute('src'),
              })
            }
          }
          return array;
      }, flightWay)
      await browser.close();
      return data;
  };

  const datas = await puppetScrape(way);
  console.log(datas);
  return datas; 
  
}

const testing = {
  fromInput: 'PEN',
  toInput: 'XMN',
  departDate: '29/09/2023',
  returnDate: '26/09/2023',
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

//

export {findCheapestFlights};
