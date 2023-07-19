import React, { useState } from "react";
import "./SearchFrom.css";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

function SearchFrom({ placeholder, data, setFromInput }) {
	const [filteredData, setFilteredData] = useState([]);
	const [fromInput, setLocalFromInput] = useState("");

	const handleFilter = (event) => {
		const searchFrom = event.target.value;
		setLocalFromInput(searchFrom);
		const newFilter = data.filter((value) => {
			return (
				value.city_name.toLowerCase().startsWith(searchFrom) ||
				value.country_name.toLowerCase().startsWith(searchFrom) ||
				value.column_1.toLowerCase().startsWith(searchFrom)
			);
		});
		if (searchFrom === "") {
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
			setFromInput(extractedValue);
			setLocalFromInput(fillItem);
		}
	};

	const clearSearch = () => {
		setFilteredData([]);
		setLocalFromInput("");
		setFromInput("");
	};

	return (
		<div className="searchfrom">
			<label htmlFor="from" className="label">
				FROM
			</label>
			<div className="searchbar">
				<input
					type="text"
					id="from"
					className="text"
					value={fromInput}
					placeholder={placeholder}
					onChange={handleFilter}
					autoComplete="off"
				/>
				<div className="icon">
					{fromInput.length === 0 ? (
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

export default SearchFrom;
