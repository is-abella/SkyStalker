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
		const newFilter = Object.values(data).filter((value) => {
			return (
				value.city.toLowerCase().startsWith(searchFrom) ||
				value.country.toLowerCase().startsWith(searchFrom)
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
		setFilteredData([]);
		setLocalFromInput(fillItem);
		setFromInput(fillItem);
	};

	const clearSearch = () => {
		setFilteredData([]);
		setLocalFromInput("");
		setFromInput("");
	};

	return (
		<div className="searchfrom">
			<label htmlFor="from" className="label">
				From
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
								{value.city}, {value.country}
								{value.iata !== "" ? ` (${value.iata})` : ""}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default SearchFrom;
