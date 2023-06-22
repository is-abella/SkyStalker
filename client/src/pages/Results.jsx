import React from "react";
import { useLocation } from "react-router-dom";

function Results() {
	const location = useLocation();
	const fromInput = location.state?.fromInput || "";
	const toInput = location.state?.toInput || "";

	return (
		<div>
			<h1>Results</h1>
			<div>From: {fromInput}</div>
			<div>To: {toInput}</div>
		</div>
	);
}

export default Results;
