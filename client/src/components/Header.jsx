import React from "react";
import logo from "/images/IMG_1981.png";
import "./Header.css";

const Header = () => {
	return (
		<div>
			<img className="logo" src={logo} alt="Logo" />
		</div>
	);
};

export default Header;
