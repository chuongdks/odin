export const orderTotal = (order) => {
  const totalItems = order.items
    .filter(x => !x.shipping)
    .reduce((total, cur) => total + (cur.price || 0) * (cur.quantity || 1), 0)

  const shippingItem = order.items.find(x => !!x.shipping)

  const shipping = totalItems > 1000 ? 0 : (shippingItem ? shippingItem.price : 0)

  return totalItems + shipping
}

// const result = orderTotal(someOrder)
// console.log(result) // 1664

// const someOrder = {
//   items: [
//     { name: 'Dragon food',          price: 8,   quantity: 8 },
//     { name: 'Dragon cage (small)',  price: 800, quantity: 2 },
//     { name: 'Shipping',             price: 40,  shipping: true }
//   ]
// }
