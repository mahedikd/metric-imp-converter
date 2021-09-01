'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const preUnit = convertHandler.getUnit(input);
    const initUnit = preUnit === 'l' ? 'L' : preUnit;

    const isValidUnit = initUnit === 'invalid unit';
    const isValidNum = typeof initNum !== 'number';

    if (isValidNum && isValidUnit) {
      res.end('invalid number and unit');
      return;
    }
    if (isValidNum) {
      res.end(initNum);
      return;
    }
    if (isValidUnit) {
      res.end(initUnit);
      return;
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    const string = convertHandler.getString(initNum, initUnit, returnNum, initUnit);
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
