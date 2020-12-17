import React, { useContext, useEffect } from "react";

// CONTEXT
import StockContext from "../context/stock/stockContext";

const Test = () => {
	// CONTEXT
	const stockContext = useContext(StockContext);
	const { setStocks } = stockContext;

	useEffect(
		() => {
			setStocks();
		},
		// eslint-disable-next-line
		[]
	);

	return <h3>Hello From Test</h3>;
};

export default Test;
