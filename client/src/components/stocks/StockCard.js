import React from "react";
import { Card } from "react-bootstrap";

import capitalize from "../../utils/capitalize";

const StockCard = ({ stock }) => {
	return (
		<Card
			border="info"
			style={{ width: "15rem", background: "rgba(0,0,0,0)", color: "white" }}
			className="text-left m-2"
		>
			<Card.Body>
				<Card.Title>{capitalize(stock.name)}</Card.Title>
				<Card.Subtitle>
					€{stock.quotes.current}{" "}
					<small className={`text-${stock.evolution > 0 ? "success" : "danger"}`}>({stock.evolution}%)</small>
				</Card.Subtitle>
				{stock &&
					stock.stocks.length > 0 &&
					stock.stocks.map((account) => (
						<Card.Text className="m-0">
							{account.name.toUpperCase()} <small>({account.stock})</small>:{" "}
							<span className={`text-${account.evolution.totalDifference > 0 ? "success" : "danger"}`}>
								€{account.evolution.totalDifference}
							</span>{" "}
							<small className={`text-${account.evolution.evolution > 0 ? "success" : "danger"}`}>
								({account.evolution.evolution}%)
							</small>
						</Card.Text>
					))}
			</Card.Body>
		</Card>
	);
};

export default StockCard;
