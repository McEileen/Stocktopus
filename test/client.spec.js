/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');
const Client = require('../lib/client');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Client', () => {
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
    it('should construct a new client object', () => {
      const client1 = new Client('Jaymay');
      expect(client1.name).to.equal('Jaymay');
      expect(client1.cash).to.equal(0);
      expect(client1.portfolios).to.be.instanceof(Array);
      expect(client1.portfolios).to.have.length(0);
      expect(client1).to.be.instanceof(Client);
    });
  });
  describe('#position', () => {
    const client2 = new Client('Celine');
    it('returns 0 if no stocks or cash', () => {
      expect(client2.position()).to.equal(0);
    });
    it('returns cash balance if no stocks', () => {
      client2.cash = 500;
      expect(client2.position()).to.equal(500);
    });
    it('returns balance of both cash and portfolio positions', () => {
      const portfolio1 = new Portfolio('tech');
      const stock1 = new Stock('AAPL');
      stock1.purchasePricePerShare = 100;
      stock1.shares = 5;
      const stock2 = new Stock('CAT');
      stock2.purchasePricePerShare = 10;
      stock2.shares = 7;
      portfolio1.stocks = [stock1, stock2];
      client2.portfolios.push(portfolio1);
      expect(client2.position()).to.equal(1070);
    });
  });

  describe('#buyStock', () => {
    it('buys stock for a new portfolio', (done) => {
      const client3 = new Client('Bob Smith');
      client3.cash = 1000;
      client3.buyStock('AAPL',5,'tech', (err,totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.equal(500);
        expect(client3.cash).to.equal(500);
        expect(client3.portfolios).to.have.length(1);
        done();
      });
    });
// stopped while working on below, test doesn't make sense yet due to copy pasta
    it('does not buy stock that costs more than a client has', (done) => {
      const client4 = new Client('Royce');
      client4.cash = 2000;
      client4.buyStock('AAPL',5,'tech', (err,totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.equal(500);
        expect(client4.cash).to.equal(500);
        expect(client4.portfolios).to.have.length(1);
        done();
      });
    });
  })
});
