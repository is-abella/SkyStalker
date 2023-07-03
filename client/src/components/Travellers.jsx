import React, { useState, useEffect } from "react";
import "./Travellers.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Travellers({ setTravellers, setAdults, setYouths, setChildren, setToddlers, setInfants }) {
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		youths: 0,
		children: 0,
		toddlers: 0,
		infants: 0,
	});
	const travellersSum = Object.values(options).reduce((a, b) => a + b, 0);

	useEffect(() => {
		setTravellers(travellersSum);
		setAdults(options.adult);
		setYouths(options.youths);
		setChildren(options.children);
		setToddlers(options.toddlers);
		setInfants(options.infants);
	}, [options, setTravellers, setAdults, setYouths, setChildren, setToddlers, setInfants]);

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
			<span onClick={() => setOpenOptions(!openOptions)} className="searchbar">
				{travellersSum > 1 ? `${travellersSum} travellers` : `${options.adult} adult`}
			</span>
			{openOptions && (
				<div className="options">
					<div className="optionItem">
						<span className="optionText">Adults 18+</span>
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
						<span className="optionText">Youths 12-17</span>
						<div className="optionCounter">
							{options.youths > 0 && (
								<RemoveIcon
									className="optionCounterButton"
									onClick={() => handleOption("youths", "d")}
								/>
							)}
							<span className="optionCounterNumber">{options.youths}</span>
							<AddIcon
								className="optionCounterButton"
								onClick={() => handleOption("youths", "i")}
							/>
						</div>
					</div>
					<div className="optionItem">
						<span className="optionText">Children 2-11</span>
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
					<div className="optionItem">
						<span className="optionText">Toddlers in own seat under 2</span>
						<div className="optionCounter">
							{options.toddlers > 0 && (
								<RemoveIcon
									className="optionCounterButton"
									onClick={() => handleOption("toddlers", "d")}
								/>
							)}
							<span className="optionCounterNumber">{options.toddlers}</span>
							<AddIcon
								className="optionCounterButton"
								onClick={() => handleOption("toddlers", "i")}
							/>
						</div>
					</div>
					<div className="optionItem">
						<span className="optionText">Infants on lap under 2</span>
						<div className="optionCounter">
							{options.infants > 0 && (
								<RemoveIcon
									className="optionCounterButton"
									onClick={() => handleOption("todinfantsdlers", "d")}
								/>
							)}
							<span className="optionCounterNumber">{options.infants}</span>
							<AddIcon
								className="optionCounterButton"
								onClick={() => handleOption("infants", "i")}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Travellers;
