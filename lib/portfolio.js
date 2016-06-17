/* eslint-disable func-names */

function Portfolio(name) {
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.position = function () {
  const stockValues = this.stocks.map(stock => stock.shares * stock.purchasePricePerShare);
  return stockValues.reduce((prev, curr) => prev + curr);
};

module.exports = Portfolio;
