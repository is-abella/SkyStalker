import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DepartDate.css";

function DepartDate({ setDepartDate, minDate }) {
	const [departDate, setLocalDepartDate] = useState(new Date());

	const updateDate = (date) => {
		setLocalDepartDate(date);
		setDepartDate(date);
	};

	return (
		<div className="flex flex-col">
			<div className="label">Depart</div>
			<DatePicker
				selected={departDate}
				onChange={(date) => updateDate(date)}
				isClearable
				minDate={minDate}
				value={departDate}
				autoComplete="off"
				id="datepicker"
				dateFormat="dd/MM/yyyy"
				placeholderText="Add departure date"
			/>
		</div>
	);
}

export default DepartDate;
