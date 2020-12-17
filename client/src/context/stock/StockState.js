import React, { useReducer } from "react";
import axios from "axios";

// CONTEXT
import StockContext from "./stockContext";

// REDUCER
import stockReducer from "./stockReducer";

import { SET_STOCKS } from "../types";

const StockState = (props) => {
	const initialState = {
		stocks: []
	};

	const [ state, dispatch ] = useReducer(stockReducer, initialState);

	// Set Stocks
	const setStocks = async () => {
		try {
			console.log(`State => Calling API`);
			const res = await axios.get(`/stocks`);
			dispatch({ type: SET_STOCKS, payload: res.data });
		} catch (error) {
			console.log(`State => Falling to call API`);
			console.error(error);
			dispatch({ type: SET_STOCKS, payload: [] });
		}
	};

	return <StockContext.Provider value={{ stocks: state.stocks, setStocks }}>{props.children}</StockContext.Provider>;
};

export default StockState;
