'use strict';

const round = (number, precision) => {
  const shift = (number, precision, reverseShift) => {
    if (reverseShift) {
      precision = -precision;
    }
    let numArray = ('' + number).split('e');
    return +(numArray[0] + 'e' + (numArray[1] ?
      (+numArray[1] + precision) :
      precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

const $round = (price) => {
  if (!price && typeof Number(price) !== 'number')
    throw new Error('no price given');
  if (price > Math.pow(10, 9))
    return round(price / Math.pow(10, 9), 0) + 'B';
  if (price > Math.pow(10, 6))
    return round(price / Math.pow(10, 6), 0) + 'M';
  if (price > Math.pow(10, 3))
    return round(price / Math.pow(10, 3), 0) + 'K';
  if (price < 0.001)
    return round(price, 3);

  return round(price, 2);
};

const posNegStyle = (value) => {
  if (!value) return {};
  const number = Number(value.replace(/[^0-9.-]+/g, ''));
  const style = {};
  if (number === 0) style.color = '#000';
  if (number > 0) style.color = '#00b894';
  if (number < 0) style.color = '#d63031';
  return style;
};

module.exports = {
  $round,
  round,
  posNegStyle,
};
