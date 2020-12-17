const express = require("express");
const axios = require("axios");

const accounts = require("../accounts");

const router = express.Router();

const extractStocks = (accounts) => {
	const blacklist = [];
	const symbols = [];

	accounts.forEach((a) => {
		a.stocks.forEach((symbol) => {
			if (!blacklist.includes(`${symbol["ticker"]}.${symbol["market"]}`)) {
				symbols.push({ name: symbol["name"], ticker: `${symbol["ticker"]}.${symbol["market"]}` });
			}
		});
	});
	return symbols;
};

allStocksAccounts = extractStocks(accounts);
// console.log(allStocksAccounts);

const calculateEvolution = (current, previous) => {
	const evol = current / previous * 100;
	return Number((evol - 100).toFixed(2));
};

const convertEpoch = (epochTimestamp) => {
	return new Date(epochTimestamp * 1000).toISOString().split("T")[0];
};

router.get("/", async (req, res) => {
	const interval = req.query.interval ? req.query.interval : "1d";
	const range = req.query.range ? req.query.range : "1y";

	// Init response
	const response = { meta: { invested: 0, gainLoss: 0 } };

	const currentStocks = [];

	// Fetch all stocks
	for (let i = 0; i < allStocksAccounts.length; i++) {
		// for (let i = 0; i < 1; i++) {
		const { name, ticker } = allStocksAccounts[i];

		const results = await axios.get(
			`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?region=FR&lang=fr-FR&includePrePost=false&corsDomain=fr.finance.yahoo.com&.tsrc=finance&interval=${interval}&range=${range}`
		);

		// Extract times & quotes
		const times = results.data.chart.result[0].timestamp;
		const quotes = results.data.chart.result[0].indicators.quote[0];

		// Extract current, yesterday, lastWeek and lastMonth
		const current = Number(quotes.close.slice(-1)[0].toFixed(2));
		const yesterday = Number(quotes.close.slice(-2, -1)[0].toFixed(2));

		currentStocks.push({
			name,
			ticker: ticker,
			quotes: { current, yesterday },
			evolution: calculateEvolution(current, yesterday),
			timestamp: convertEpoch(times.slice(-1)[0]),
			stocks: []
		});
	}

	accounts.forEach((account) => {
		account.stocks.forEach((stock) => {
			try {
				const currentStock = currentStocks.filter((s) => s.name === stock.name)[0];
				const difference = Number((currentStock.quotes.current - stock.price).toFixed(2));
				const totalDifference = Number((difference * stock.quantity).toFixed(2));

				response.meta.invested += stock.price * stock.quantity;
				response.meta.gainLoss += totalDifference;

				currentStock.stocks.push({
					name: account.name,
					price: stock.price,
					stock: stock.quantity,
					evolution: {
						evolution: calculateEvolution(currentStock.quotes.current, stock.price),
						difference,
						totalDifference
					}
				});
			} catch (error) {}
		});
	});

	// Get all stocks that are not empty
	response["stocks"] = currentStocks.filter((stock) => stock.stocks.length > 0);

	// Add metadata
	response.meta.invested = Number(response.meta.invested.toFixed(2));
	response.meta.gainLoss = Number(response.meta.gainLoss.toFixed(2));
	response.meta["evolution"] = Number((response.meta.gainLoss / response.meta.invested * 100).toFixed(2));

	res.status(200).json(response);
});

module.exports = router;
