// 1. Capitalize
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 2. Reverse String
export const reverseString = (str) => {
  return str.split('').reverse().join('');
};

// 3. Calculator
export const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// 4. Caesar Cipher
export const shiftChar = (char, shiftFactor) => {
    const code = char.charCodeAt(0);

    // Handle Uppercase (65-90)
    if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shiftFactor) % 26) + 65);  // modulo 26 cuz alphabet has 26 characters
    }
    // Handle Lowercase (97-122)
    if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shiftFactor) % 26) + 97);  // modulo 26 cuz alphabet has 26 characters
    }
    // Return punctuation/spaces unchanged
    return char;
};

export const caesarCipher = (str, shift) => {
  return str
    .split('')
    .map((char) => shiftChar(char, shift))
    .join('');
};

// 5. Analyze Array
export const analyzeArray = (arr) => { // arr: Array
  const sum = arr.reduce((total, cur) => total + cur, 0);
  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
};