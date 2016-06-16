/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');

describe('Stock', () => {
  describe('constructor', () => {
    it('should construct a new stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });

  describe('#purchase', () =>{
    it("should purchase stock", (done) => {
      const s1 = new Stock('aapl');
      s1.purchase(50, (err, totalPaid) => {  //(err, totalPaid) refers to cb(null, totalPaid);
        expect(err).to.be.null;
        expect(totalPaid).to.be.above(0);
        expect(s1.shares).to.equal(50);
        expect(s1.name).to.have.length.above(0);
        expect(s1.purchasePricePerShare).to.be.above(0);
        done();
      });
    });
  });

  describe('#sell', () =>{
    it("should sell stock", (done) => {
      const s1 = new Stock('aapl');
      s1.shares = 50;
      s1.sell(20, (err, totalCashReceived) => {
          expect(err).to.be.null;
          expect(totalCashReceived).to.be.above(0);
          expect(s1.shares).to.equal(30);
          done();
      });
    });
  });
});
