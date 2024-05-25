const convertToCelsius = function(degreeFah) {
  let degreeCel = 0;
  degreeCel = (degreeFah - 32) * (5/9);
  return Math.round(degreeCel * 10) / 10;
};

const convertToFahrenheit = function(degreeCel) {
  let degreeFah = 0;
  degreeFah = (degreeCel * (9/5) + 32);
  return Math.round(degreeFah * 10) / 10;
};
// Solution ways:
// const convertToCelsius = function (fahrenheit) {
//   return Math.round((fahrenheit - 32) * (5 / 9) * 10) / 10;
// };

// const convertToFahrenheit = function (celsius) {
//   return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
// };

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
