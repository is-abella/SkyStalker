import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReturnDate.css";

function ReturnDate({ setReturnDate, minDate }) {
	const [returnDate, setLocalReturnDate] = useState(new Date());

	const updateDate = (date) => {
		setReturnDate(date);
		setLocalReturnDate(date);
	};

	return (
		<div className="flex flex-col">
			<div className="label">Return</div>
			<DatePicker
				selected={returnDate}
				onChange={(date) => updateDate(date)}
				isClearable
				value={returnDate}
				minDate={minDate}
				autoComplete="off"
				id="datepicker"
				dateFormat="dd/MM/yyyy"
				placeholderText="Add return date"
			/>
		</div>
	);
}

export default ReturnDate;
