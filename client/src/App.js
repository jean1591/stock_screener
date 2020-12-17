import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// COMPONENTS
import Stocks from "./components/stocks/Stocks";

// STATE
import StockState from "./context/stock/StockState";

const App = () => {
	return (
		<div className="App">
			<div className="container">
				<StockState>
					<Stocks />
				</StockState>
			</div>
		</div>
	);
};

export default App;
