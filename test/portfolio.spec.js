/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Portfolio = require('../lib/portfolio');
const Stock = require('../lib/stock');

describe('Portfolio', () => {
  describe('constructor', () => {
    it('should construct a new portfolio object', () => {
      const portfolio1 = new Portfolio('moneybags');
      expect(portfolio1).to.be.instanceof(Portfolio);
      expect(portfolio1.name).to.equal('moneybags');
      expect(portfolio1.stocks).to.be.instanceof(Array);
    });
  });
  describe('#position', () => {
    const portfolio2 = new Portfolio('rich person');
    const stock1 = new Stock('AAPL');
    stock1.purchasePricePerShare = 100;
    stock1.shares = 5;
    const stock2 = new Stock('CAT');
    stock2.purchasePricePerShare = 10;
    stock2.shares = 7;
    portfolio2.stocks = [stock1, stock2];
    it('returns the value of the stocks', () => {
      expect(portfolio2.position()).to.be.equal(570);
    });
  });
});
