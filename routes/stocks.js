const express = require("express");
const axios = require("axios");

const symbols = require("../symbols");

const router = express.Router();

const calculateEvolution = (current, previous, quantity) => {
	const evol = current / previous * 100;
	return {
		percentage: Number(evol.toFixed(2)),
		evolution: Number((evol - 100).toFixed(2)),
		difference: Number((current - previous).toFixed(2)),
		totalDifference: Number(((current - previous) * quantity).toFixed(2))
	};
};

const convertEpoch = (epochTimestamp) => {
	return new Date(epochTimestamp * 1000).toISOString().split("T")[0];
};

router.get("/", async (req, res) => {
	const interval = req.query.interval ? req.query.interval : "1d";
	const range = req.query.range ? req.query.range : "1y";

	// Init final data
	const response = [];

	// Loop & Fetch symbols
	// for (let i = 0; i < symbols.length; i++) {
	for (let i = 0; i < 1; i++) {
		const symbol = symbols[i];

		console.log(symbol["name"]);

		// Init current symbol
		const currentData = {
			symbol: symbol["name"],
			quantity: symbol["quantity"],
			price: symbol["price"],
			totalPrice: Number((symbol["quantity"] * symbol["price"]).toFixed(2))
		};

		const ticker = `${symbol["ticker"]}.${symbol["market"]}`;

		const results = await axios.get(
			`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?region=FR&lang=fr-FR&includePrePost=false&corsDomain=fr.finance.yahoo.com&.tsrc=finance&interval=${interval}&range=${range}`
		);

		// Extract times & quotes
		const times = results.data.chart.result[0].timestamp;
		const quotes = results.data.chart.result[0].indicators.quote[0];

		currentData["current"] = {
			close: Number(quotes.close.slice(-1)[0].toFixed(2)),
			totalClose: Number((quotes.close.slice(-1)[0] * symbol["quantity"]).toFixed(2)),
			timestamp: convertEpoch(times.slice(-1)[0]),
			evolution: calculateEvolution(
				Number(quotes.close.slice(-1)[0].toFixed(2)),
				symbol["price"],
				symbol["quantity"]
			)
		};

		currentData["yesterday"] = {
			close: Number(quotes.close.slice(-2, -1)[0].toFixed(2)),
			timestamp: convertEpoch(times.slice(-2, -1)[0]),
			evolution: calculateEvolution(
				Number(quotes.close.slice(-2, -1)[0].toFixed(2)),
				symbol["price"],
				symbol["quantity"]
			)
		};

		currentData["lastWeek"] = {
			close: Number(quotes.close.slice(-5, -4)[0].toFixed(2)),
			timestamp: convertEpoch(times.slice(-5, -4)[0]),
			evolution: calculateEvolution(
				Number(quotes.close.slice(-5, -4)[0].toFixed(2)),
				symbol["price"],
				symbol["quantity"]
			)
		};

		currentData["lastMonth"] = {
			close: Number(quotes.close.slice(-22, -21)[0].toFixed(2)),
			timestamp: convertEpoch(times.slice(-22, -21)[0]),
			evolution: calculateEvolution(
				Number(quotes.close.slice(-22, -21)[0].toFixed(2)),
				symbol["price"],
				symbol["quantity"]
			)
		};

		response.push(currentData);
	}

	res.status(200).json(response);
});

module.exports = router;
