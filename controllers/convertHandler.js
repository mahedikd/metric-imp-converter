function ConvertHandler() {
  this.getNum = function (input) {
    if (!/\d+/.test(input)) return 1;

    const numbers = input.split('/').map((num) => parseFloat(num));
    if (numbers.length > 2) return 'invalid number';
    if (numbers.length === 1) return numbers[0];

    return numbers[0] / numbers[1];
  };

  this.getUnit = function (input) {
    const stringRegx = /[a-zA-Z]+/g;
    const string = input.match(stringRegx)?.[0].toLowerCase() || 'lsl';
    let unit;

    switch (string) {
      case 'gal':
      case 'l':
      case 'lbs':
      case 'kg':
      case 'mi':
      case 'km':
      case 'km':
        unit = string;
        break;
      default:
        unit = 'invalid unit';
    }
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'l';
        break;
      case 'l':
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(this.getReturnUnit(returnUnit));

    result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;

    return result;
  };
}

module.exports = ConvertHandler;
