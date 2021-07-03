// React
import React from "react";

//Emotion imports
import styled from "@emotion/styled";

const Buttons = styled.button`
	height: 38px;
	padding: 9px 26px;
	background: #5c5c5c;
	color: #fff;
	font: 400 14px Roboto;
	border-radius: 8px;
	border: none;
	outline: none;
	cursor: pointer;
	&:hover {
		background-color: #6c4193;
	}
`;

const ProfileButton = (props) => {
	const { onClick, BUTTON_TYPE, button_name, className } = props;
	var ButtonRender = null;

	switch (BUTTON_TYPE) {
		case "BIG":
			ButtonRender = (
				<>
					<Buttons
						style={{ height: "43px", padding: "7px 31px" }}
						onClick={onClick}
						className={className}
					>
						{button_name}
					</Buttons>
				</>
			);
			break;
		case "SMALL":
			ButtonRender = (
				<>
					<Buttons onClick={onClick} className={className}>
						{button_name}
					</Buttons>
				</>
			);
			break;
		default:
			ButtonRender = (
				<>
					<Buttons
						style={{
							background: "#fff",
							border: "1px solid #5C5C5C",
							color: "#5C5C5C"
						}}
						onClick={onClick}
						className={className}
					>
						{button_name}
					</Buttons>
				</>
			);
	}
	return <>{ButtonRender}</>;
};

export default ProfileButton;
