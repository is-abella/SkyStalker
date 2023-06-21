import React, { useState } from "react";
import "./Travellers.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Travellers() {
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
	});

	const handleOption = (name, operation) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: operation === "i" ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	return (
		<div className="travellers">
			<div className="label">Travellers</div>
			<span
				onClick={() => setOpenOptions(!openOptions)}
				className="searchbar">{`${options.adult} adult · ${options.children} children`}</span>
			{openOptions && (
				<div className="options">
					<div className="optionItem">
						<span className="optionText">Adults</span>
						<div className="optionCounter">
							{options.adult > 1 && (
								<RemoveIcon
									className="optionCounterButton"
									onClick={() => handleOption("adult", "d")}
								/>
							)}
							<span className="optionCounterNumber">{options.adult}</span>
							<AddIcon
								className="optionCounterButton"
								onClick={() => handleOption("adult", "i")}
							/>
						</div>
					</div>
					<div className="optionItem">
						<span className="optionText">Children</span>
						<div className="optionCounter">
							{options.children > 0 && (
								<RemoveIcon
									className="optionCounterButton"
									onClick={() => handleOption("children", "d")}
								/>
							)}
							<span className="optionCounterNumber">{options.children}</span>
							<AddIcon
								className="optionCounterButton"
								onClick={() => handleOption("children", "i")}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Travellers;
