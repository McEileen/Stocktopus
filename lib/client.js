/* eslint-disable no-unused-expressions, func-names */
const Portfolio = require('./portfolio');
const Stock = require('./stock');

function Client(name) {
  this.name = name;
  this.cash = 0;
  this.portfolios = [];
}

Client.prototype.position = function () {
  if (this.portfolios.length === 0) {
    return this.cash;
  }
  return this.cash + this.portfolios.reduce((total, portfolio) => total + portfolio.position(), 0);
};

Client.prototype.buyStock = function (stockName, numShares, portfolioName, cb) {
  const newPort = new Portfolio(portfolioName);
  this.portfolios.push(newPort);

  const newStock = new Stock(stockName);
  newStock.purchase(numShares, (err, totalPaid) => {
    this.cash -= totalPaid;
    cb(err, totalPaid);
  });
};

module.exports = Client;
