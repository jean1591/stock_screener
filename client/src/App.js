import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// COMPONENTS
import TimeComp from "./components/time/TimeComp";
import Stocks from "./components/stocks/Stocks";

// STATE
import StockState from "./context/stock/StockState";

const App = () => {
	return (
		<div className="App">
			<TimeComp />
			<StockState>
				<Stocks />
			</StockState>
		</div>
	);
};

export default App;
