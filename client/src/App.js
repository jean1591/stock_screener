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
			<StockState>
				<div className="m-5">
					<Stocks />
				</div>
			</StockState>
		</div>
	);
};

export default App;
