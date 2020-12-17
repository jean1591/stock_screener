import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import capitalize from "../../utils/capitalize";

const StockCard = ({ stock }) => {
	console.log(stock);
	return (
		<div className="col-md-4 mb-3">
			<div className="card text-left">
				<div className="card-body">
					<h5 className="card-title">{capitalize(stock.symbol)}</h5>
					<p className="card-subtitle mb-2 text-muted">
						€{stock.current.close}{" "}
						<span className={`text-${stock.current.evolution.evolution > 0 ? "success" : "danger"}`}>
							({stock.current.evolution.evolution > 0 ? "+" : "-"}
							{stock.current.evolution.evolution}%)
						</span>
					</p>

					<ListGroup className="list-group-flush d-flex justify-content-between lh-condensed">
						<ListGroupItem>
							<p className="my-0">
								Bought at <small className="text-muted">€{stock.price}</small>
							</p>
						</ListGroupItem>
						<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
						<ListGroupItem>Vestibulum at eros</ListGroupItem>
					</ListGroup>

					<ul className="px-0">
						<li className="list-group-item d-flex justify-content-between lh-condensed">
							<div>
								<p className="my-0">Bought at</p>
								<small className="text-muted">€{stock.price}</small>
							</div>
							<div>
								<p className="my-0">
									Current {stock.current.evolution.evolution > 0 ? "gain" : "loss"}:
								</p>
								<small
									className={`text-${stock.current.evolution.evolution > 0 ? "success" : "danger"}`}
								>
									€{stock.current.evolution.difference}
								</small>
							</div>
						</li>
					</ul>

					<p className="card-text">
						€{stock.current.evolution.difference}
						{" / "}
						<span className={`text-${stock.current.evolution.evolution > 0 ? "success" : "danger"}`}>
							€{stock.price} ({stock.current.evolution.evolution > 0 ? "+" : "-"}
							{stock.current.evolution.evolution}%)
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default StockCard;
