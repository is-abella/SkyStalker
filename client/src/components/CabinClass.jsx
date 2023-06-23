import React, { useState } from "react";
import Select from "react-select";
import "./CabinClass.css";

function CabinClass({ cabinClassOptions, selectedCabinClass, setCabinClass }) {
	return (
		<div>
			<div className="label">Cabin Class</div>
			<Select
				className="basic-single"
				classNamePrefix="select"
				defaultValue={selectedCabinClass}
				name="cabin-class"
				options={cabinClassOptions}
				onChange={(inputValue) => setCabinClass(inputValue.value)}
			/>
		</div>
	);
}

export default CabinClass;
