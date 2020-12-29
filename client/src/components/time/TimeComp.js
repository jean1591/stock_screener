import React, { useEffect, useState } from "react";

const clockStyle = {
	color: "#5bc0de",
	textShadow: "#5bc0de 1px 0 10px"
};

const TimeComp = () => {
	const [ currentTime, setCurrentTime ] = useState(null);

	useEffect(
		() => {
			const interval = setInterval(() => {
				const now = new Date();
				setCurrentTime(now.toLocaleTimeString());
			}, 1000);
			return () => clearInterval(interval);
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<div className="mt-5" style={clockStyle}>
			<h1 className="m-0">{currentTime}</h1>
		</div>
	);
};

export default TimeComp;
