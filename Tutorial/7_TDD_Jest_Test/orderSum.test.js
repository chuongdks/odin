import { orderTotal } from './orderSum.js';

// 1. Happy Path: Basic calculation without shipping
test('calculates the total for multiple items without shipping', () => {
  const someOrder = {
    items: [
      { name: 'Dragon food', price: 10, quantity: 2 },
      { name: 'Dragon toy',  price: 20, quantity: 1 }
    ]
  };
  // (10 * 2) + (20 * 1) = 40. No shipping item present, logic might need a check here.
  expect(orderTotal(someOrder)).toBe(40);
});

// 2. Shipping Logic: Below the 1000 threshold
test('adds shipping cost if total is 1000 or less', () => {
  const someOrder = {
    items: [
      { name: 'Dragon food', price: 100, quantity: 1 },
      { name: 'Shipping',    price: 40,  shipping: true }
    ]
  };
  // totalItems is 100. Since 100 <= 1000, shipping (40) is added.
  expect(orderTotal(someOrder)).toBe(140);
});

// 3. Shipping Logic: Above the 1000 threshold (Free Shipping)
test('provides free shipping if totalItems is greater than 1000', () => {
  const someOrder = {
    items: [
      { name: 'Dragon Cage', price: 1100, quantity: 1 },
      { name: 'Shipping',    price: 40,   shipping: true }
    ]
  };
  // totalItems is 1100. Since 1100 > 1000, shipping becomes 0.
  expect(orderTotal(someOrder)).toBe(1100);
});

// 4. Edge Case: Exactly 1000
test('still charges shipping if total is exactly 1000', () => {
  const someOrder = {
    items: [
      { name: 'Gold Armor', price: 500, quantity: 2 },
      { name: 'Shipping',   price: 40,  shipping: true }
    ]
  };
  // Your logic: totalItems > 1000 ? 0 : shippingItem.price
  // 1000 is NOT > 1000, so it should still charge 40.
  expect(orderTotal(someOrder)).toBe(1040);
});

// 5. Unhappy Path: Missing quantity
test('handles items with missing quantity by defaulting or failing gracefully', () => {
  const someOrder = {
    items: [
      { name: 'Dragon food', price: 8 } // quantity is missing!
    ]
  };
  
  // Currently, 8 * undefined = NaN. 
  // NaN + shipping will still be NaN.
  expect(orderTotal(someOrder)).toBe(8); 
});


