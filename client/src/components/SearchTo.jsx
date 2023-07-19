import React, { useState } from "react";
import "./SearchTo.css";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

function SearchTo({ placeholder, data, setToInput }) {
	const [filteredData, setFilteredData] = useState([]);
	const [toInput, setLocalToInput] = useState("");

	const handleFilter = (event) => {
		const searchTo = event.target.value;
		setLocalToInput(searchTo);
		const newFilter = data.filter((value) => {
			return (
				value.city_name.toLowerCase().startsWith(searchTo) ||
				value.country_name.toLowerCase().startsWith(searchTo) ||
				value.column_1.toLowerCase().startsWith(searchTo)
			);
		});
		if (searchTo === "") {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const fillSearch = (event) => {
		const fillItem = event.target.innerHTML; //not sure if innerHTML is right
		const regex = /\(([^)]+)\)/;
		const matches = regex.exec(fillItem);

		if (matches && matches.length > 1) {
			const extractedValue = matches[1];
			setFilteredData([]);
			setToInput(extractedValue);
			setLocalToInput(fillItem);
		}
	};

	const clearSearch = () => {
		setFilteredData([]);
		setLocalToInput("");
		setToInput("");
	};
	return (
		<div className="searchto">
			<label for="to" className="label">
				TO
			</label>
			<div className="searchbar">
				<input
					type="text"
					id="to"
					className="text"
					value={toInput}
					placeholder={placeholder}
					onChange={handleFilter}
					autoComplete="off"
				/>
				<div className="icon">
					{toInput.length === 0 ? (
						<SearchIcon />
					) : (
						<ClearIcon id="clearbtn" onClick={clearSearch} />
					)}
				</div>
			</div>
			{filteredData.length !== 0 && (
				<div className="dataresults" onClick={fillSearch}>
					{filteredData.slice(0, 15).map((value, key) => {
						return (
							<div className="dataitem" key={key}>
								{value.city_name}, {value.country_name}
								{` (${value.column_1})`}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default SearchTo;
