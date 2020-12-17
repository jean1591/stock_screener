import React, { useContext, useEffect, Fragment } from "react";

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
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<Fragment>
			{stocks.length > 0 ? (
				<div className="row justify-content-center">
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
					{stocks.map((stock, i) => <StockCard key={i} stock={stock} />)}
				</div>
			) : (
				<h3 className="text-center">Loading</h3>
			)}
		</Fragment>
	);
};

export default Stocks;
