import React from "react";
import "./htmlConverter.css"

function htmlConverter(data, fromInput, toInput, tripWay, travellers, cabinClass) {
  
	if (tripWay === "One-way") {
    
		let htmlString = `
    <div class="results-main">
    ${data
		.map((flight) => {
			const price = parseFloat(flight.price.replace(/[^0-9.-]+/g, ""));
			return `
        <div class="option">
          <div class="left">
            <div class="going">
              <div class="details">
                <div class="time">${flight.flightTiming}</div>
                <div>${fromInput} - ${toInput}</div>
              </div>
              <div class="stops">${flight.stops}</div>
              <div class="duration"> ${flight.flightDuration}</div>
            </div>
            <div class="airline">${flight.airlines}</div>
          </div>
          <div class="right">
            <div class="price"> ${
				travellers > 1 ? `${flight.price} / person` : `${flight.price}`
			}</div>
            <div class="price">${travellers > 1 ? `S$ ${price * travellers} total` : ""}</div>
            <div className="cabin-class">${cabinClass}</div> 
            <div class="linkDeal">
              <a href="${flight.link}" target="_blank" class="view-details-button">View Details</a>
            </div>          
          </div>
        </div>`;
		})
		.join("")}
    </div>`;
		return htmlString;
	} else {
		let htmlString = `
      <div class="results-main">
        ${data
			.map((flight) => {
				const price = parseFloat(flight.price.replace(/[^0-9.-]+/g, ""));
				return `
              <div class="option">
                <div class="left">
                  <div class="going">
                    <div class="details">
                      <div class="time">${flight.goingToDetails.flightTiming}</div>
                      <div>${fromInput} - ${toInput}</div>
                    </div>
                    <div class="stops">${flight.goingToDetails.stops}</div>
                    <div class="duration">${flight.goingToDetails.flightDuration}</div>
                  </div>
                  <div class="return">
                    <div class="details">
                      <div class="time">${flight.comingBackDetails.flightTiming}</div>
                      <div>${toInput} - ${fromInput}</div>
                    </div>
                    <div class="stops">${flight.comingBackDetails.stops}</div>
                    <div class="duration">${flight.comingBackDetails.flightDuration}</div>
                  </div>
                  <div class="airline">${flight.airlines}</div>
                </div>
                <div class="right">
                  <div class="price">${
						travellers > 1 ? `${flight.price} / person` : `${flight.price}`
					}</div>
                  <div class="price">${travellers > 1 ? `S$ ${price * travellers} total` : ""}</div>
                  <div className="cabin-class">${cabinClass}</div>
                  <div class="linkDeal">
                    <a href="${flight.link}" target="_blank" class="view-details-button">View Details</a>
                  </div>
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
