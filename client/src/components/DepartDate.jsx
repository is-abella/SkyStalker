import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DepartDate.css";

function DepartDate() {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<div className="flex flex-col">
			<div className="label">Depart</div>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				isClearable
				id="datepicker"
				dateFormat="dd/MM/yyyy"
				placeholderText="Add departure date"
			/>
		</div>
	);
}

export default DepartDate;
