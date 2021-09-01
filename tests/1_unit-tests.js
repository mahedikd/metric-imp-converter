const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
    // test 1
    test('convertHandler should correctly read a whole number input', function (done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    // test 2
    test('convertHandler should correctly read a decimal number input', function (done) {
      const input = '3.2KM';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    // test 3
    test('convertHandler should correctly read a fractional input', function (done) {
      const input = '3/2L';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });
    // test 4
    test('convertHandler should correctly read a fractional input with a decimal', function (done) {
      const input = '3.3/3.3mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

    // test 5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function (done) {
      const input = '3/2/3mi';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    // test 6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
      const input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
  suite('Function convertHandler.getUnit(input)', function () {
    // test 7
    test('convertHandler should correctly read each valid input unit', function (done) {
      const input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG',
      ];
      input.forEach(function (elm) {
        assert.equal(convertHandler.getUnit(elm), elm.toLowerCase());
      });
      done();
    });

    // test 8
    test('convertHandler should correctly return an error for an invalid input unit', function (done) {
      const input = [
        'gall',
        'lll',
        'mik',
        'kmlc',
        'lbslc',
        'kgec',
        'GALlsc',
        'Llsc',
        'MIlcs',
        'KMlsc',
        'LBSls',
        'KGsl',
      ];
      input.forEach(function (elm) {
        assert.equal(convertHandler.getUnit(elm), 'invalid unit');
      });
      done();
    });
  });
  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    // test 9
    test('convertHandler should return the correct return unit for each valid input unit', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (elm, i) {
        assert.equal(convertHandler.getReturnUnit(elm), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {
    // test 10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expected = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];
      input.forEach(function (elm, i) {
        assert.equal(convertHandler.spellOutUnit(elm), expected[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function () {
    // test 11
    test('convertHandler should correctly convert gal to L.', function (done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    // test 12
    test('convertHandler should correctly convert L to gal', function (done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    // test 13
    test('convertHandler should correctly convert mi to km', function (done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
      //done();
    });

    // test 14
    test('convertHandler should correctly convert km to mi', function (done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    // test 15
    test('convertHandler should correctly convert lbs to kg', function (done) {
      const input = [1, 'lbs'];
      const expected = 0.45359;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    // test 16
    test('convertHandler should correctly convert kg to lbs', function (done) {
      const input = [1, 'kg'];
      const expected = 2.20462;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });
});

