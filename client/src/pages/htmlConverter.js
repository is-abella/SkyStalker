import React from "react";

function htmlConverter(data, fromInput, toInput, tripWay, travellers, cabinClass) {
	if (tripWay === "One-way") {
		let htmlString = `
    <div class="results-main">
    <h2>Results</h2>
    ${data
		.map((flight) => {
			const price = parseFloat(flight.price.replace(/[^0-9.-]+/g, ""));
			return `
        <div class="option">
          <div class="left">
            <div class="flight">
              <div class="details">
                <div>${flight.flightTiming}</div>
                <div>${fromInput} - ${toInput}</div>
              </div>
              <div>${flight.stops}</div>
              <div>${flight.flightDuration}</div>
            </div>
            <div>${flight.airlines}</div>
          </div>
          <div class="right">
            <div>${travellers > 1 ? `${flight.price}/person` : `${flight.price}`}</div>
            <div>${travellers > 1 ? `S$ ${price * travellers} total` : ""}</div>
            <div>${cabinClass}</div>           
          </div>
        </div>`;
		})
		.join("")}
    </div>`;
    return htmlString;
	} else {
    let htmlString = `
      <div class="results-main">
        <h2>Results</h2>
        ${data
        .map((flight) => {
          const price = parseFloat(flight.price.replace(/[^0-9.-]+/g, ""));
          return `
              <div class="option">
                <div class="left">
                  <div class="going">
                    <div class="details">
                      <div>${flight.goingToDetails.flightTiming}</div>
                      <div>${fromInput} - ${toInput}</div>
                    </div>
                    <div>${flight.goingToDetails.stops}</div>
                    <div>${flight.goingToDetails.flightDuration}</div>
                  </div>
                  <div class="return">
                    <div class="details">
                      <div>${flight.comingBackDetails.flightTiming}</div>
                      <div>${toInput} - ${fromInput}</div>
                    </div>
                    <div>${flight.comingBackDetails.stops}</div>
                    <div>${flight.comingBackDetails.flightDuration}</div>
                  </div>
                  <div class="airline">${flight.airlines}</div>
                </div>
                <div class="right">
                  <div>${travellers > 1 ? `${flight.price}/person` : `${flight.price}`}</div>
                  <div>${travellers > 1 ? `S$ ${price * travellers} total` : ""}</div>
                  <div>${cabinClass}</div>
                </div>
              </div>
            `;
        })
        .join("")}
      </div>`;
    return htmlString;
  }
}

export default htmlConverter;
