import React from "react";
import Select from "react-select";

function TripWay({ tripWayOptions, selectedTripWay, setTripWay }) {
	return (
		<div>
			<div className="label">TRIP TYPE</div>
			<Select
				className="basic-single"
				classNamePrefix="select"
				options={tripWayOptions}
				defaultValue={selectedTripWay}
				onChange={(inputValue) => setTripWay(inputValue.value)}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						border: state.isSelected ? "black" : "none",
					}),
				}}
			/>
		</div>
	);
}

export default TripWay;
