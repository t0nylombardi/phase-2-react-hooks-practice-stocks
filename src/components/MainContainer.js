import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const MainContainer = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  const handleAddStock = (clickedStock) => {
    if (!portfolio.includes(clickedStock)) {
      setPortfolio([...portfolio, clickedStock]);
    }
  }

  const handleRemoveStock = (clickedStock) => {
    setPortfolio(portfolio.filter(stock => stock.id !== clickedStock.id));
  }

  const sortedStocks = [...stocks].sort((stockA, stockB) => {
    if (sortBy === "Alphabetically") {
      return stockA.name.localeCompare(stockB.name);
    } else {
      return stockA.price - stockB.price;
    }
  });

  const filteredStocks = sortedStocks.filter(stock => stock.type === filterBy);

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleAddStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={portfolio}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
