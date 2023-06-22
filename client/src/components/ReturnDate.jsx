import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReturnDate.css";

function ReturnDate() {
	const [returnDate, setReturnDate] = useState(new Date());
	return (
		<div className="flex flex-col">
			<div className="label">Return</div>
			<DatePicker
				selected={returnDate}
				onChange={(date) => setReturnDate(date)}
				isClearable
				id="datepicker"
				dateFormat="dd/MM/yyyy"
				placeholderText="Add return date"
			/>
		</div>
	);
}

export default ReturnDate;
