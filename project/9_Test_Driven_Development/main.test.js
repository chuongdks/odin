import { capitalize, reverseString, calculator, caesarCipher, shiftChar, analyzeArray } from './main';

// 1. Capitalize
test('capitalize: handles lowercase strings', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('capitalize: handles single characters', () => {
  expect(capitalize('a')).toBe('A');
});

// 2. Reverse String
test('reverseString: reverses a standard string', () => {
  expect(reverseString('odin')).toBe('nido');
});

// 3. Calculator
test('calculator: adds two numbers', () => {
  expect(calculator.add(2, 2)).toBe(4);
});

test('calculator: divides two numbers', () => {
  expect(calculator.divide(10, 2)).toBe(5);
});

test('calculator: subtract two numbers', () => {
  expect(calculator.subtract(7, 2)).toBe(5);
});

test('calculator: multiply two numbers', () => {
  expect(calculator.multiply(10, 2)).toBe(20);
});

// 4. Caesar Cipher
test('caesarCipher: shifts characters correctly', () => {
  expect(caesarCipher('abc', 3)).toBe('def');
});

test('caesarCipher: wraps from z to a', () => {
  expect(caesarCipher('xyz', 3)).toBe('abc');
});

test('caesarCipher: preserves case', () => {
  expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
});

test('caesarCipher: ignores punctuation and spaces', () => {
  expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
});

test('shiftChar: wraps z to a correctly', () => {
  expect(shiftChar('z', 1)).toBe('a');
});

// 5. Analyze Array
test('analyzeArray: returns correct object properties', () => {
  const result = analyzeArray([1, 8, 3, 4, 2, 6]);
  expect(result).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});