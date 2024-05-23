import React from "react";
import Stock from "./Stock";

const PortfolioContainer = ({ stocks, onRemoveStock}) => {
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        stocks.map((stock) => (
          <Stock key={stock.id} stock={stock} onStockClick={onRemoveStock} />
        ))
      }
    </div>
  );
}

export default PortfolioContainer;
