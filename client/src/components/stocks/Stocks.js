import React, { useContext, useEffect } from "react";

// CONTEXT
import StockContext from "../../context/stock/stockContext";

// COMPONENTS
import StockCard from "./StockCard";

const Stocks = () => {
	// CONTEXT
	const stockContext = useContext(StockContext);
	const { setStocks, stocks } = stockContext;

	useEffect(
		() => {
			setStocks();
			const interval = setInterval(() => {
				setStocks();
			}, 1000 * 60 * 60);
			return () => clearInterval(interval);
		},
		// eslint-disable-next-line
		[]
	);

	// console.log(stocks);

	return (
		<div className="m-5">
			{stocks && stocks.stocks && stocks.stocks.length > 0 ? (
				<div className="row justify-content-center">
					{stocks.stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
				</div>
			) : (
				<h3 className="text-center">Loading</h3>
			)}
		</div>
	);
};

export default Stocks;
