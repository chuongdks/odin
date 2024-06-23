const add = function(a,b) {
	return a + b;
};

const subtract = function(a,b) {
	return a - b;
};

const sum = function(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
};

const multiply = function(array) {
  return array.reduce((acc, curr) => acc * curr);
};

const power = function(base, exp) {
  let pow = 1;
  for (let x = 0; x < exp; x++)
  {
    pow *= base;
  }
	return pow;
};

const factorial = function(num) {
  let fact = 1;
	while (num != 0)
  {
    fact *= num;
    num--;
  }
  return fact;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
