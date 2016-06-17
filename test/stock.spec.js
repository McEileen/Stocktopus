/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Stock', () => {
  before(() => {
    clock = sinon.useFakeTimers();
    nock('http://dev.markitondemand.com')
    .persist()
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100,
    });
  });
  after(() => {
    clock.restore();
    nock.cleanAll();
  });

  describe('constructor', () => {
    it('should construct a new stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });

  describe('#purchase', () => {
    it("should purchase stock", (done) => {
      const s1 = new Stock('aapl');
      clock.tick(150);
      s1.purchase(50, (err, totalPaid) => {  //(err, totalPaid) refers to cb(null, totalPaid);
        expect(err).to.be.null;
        expect(totalPaid).to.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchaseDate.getTime()).to.equal(150);
        expect(s1.name).to.equal('Apple');
        expect(s1.purchasePricePerShare).to.equal(100);
        done();
      });
    });
  });

  describe('#sell', () => {
    it("should sell stock", (done) => {
      const s1 = new Stock('aapl');
      s1.shares = 50;
      s1.sell(20, (err, totalCashReceived) => {
          expect(err).to.be.null;
          expect(totalCashReceived).to.equal(2000);
          expect(s1.shares).to.equal(30);
          done();
      });
    });
    it("should not allow you to sell more shares than you have", (done) => {
      const s2 = new Stock('yahoo');
      s2.shares = 5;
      s2.sell(10, (err) => {
          expect(err.message).to.equal('Not enough shares.');
          expect(s2.shares).to.equal(5);
          done();
      });
    });
  });
});
