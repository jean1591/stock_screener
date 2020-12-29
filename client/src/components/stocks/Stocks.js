import React, { useContext, useEffect, Fragment } from "react";

// CONTEXT
import StockContext from "../../context/stock/stockContext";

// COMPONENTS
import StockCard from "./StockCard";
import StocksRecap from "./StocksRecap";

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
		<Fragment>
			{/* <StocksRecap meta={stocks.meta} /> */}
			{stocks && stocks.stocks && stocks.stocks.length > 0 ? (
				<div className="row justify-content-center">
					{stocks.stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
				</div>
			) : (
				<h3 className="text-center">Loading</h3>
			)}
		</Fragment>
	);
};

export default Stocks;
