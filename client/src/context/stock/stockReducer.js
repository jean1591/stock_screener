import { SET_STOCKS } from "../types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case SET_STOCKS:
			return { ...state, stocks: action.payload };
		default:
			return state;
	}
};
