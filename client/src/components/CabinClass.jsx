import React from "react";
import Select from "react-select";
import "./CabinClass.css";

function CabinClass() {
	const options = [
		{ value: "economy", label: "Economy" },
		{ value: "premium economy", label: "Premium Economy" },
		{ value: "business class", label: "Business Class" },
		{ value: "first class", label: "First Class" },
	];
	return (
		<div>
			<div className="label">Cabin Class</div>
			<Select
				className="basic-single"
				classNamePrefix="select"
				defaultValue={options[0]}
				name="cabin-class"
				options={options}
			/>
		</div>
	);
}

export default CabinClass;
