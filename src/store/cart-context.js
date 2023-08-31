import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {}
});

export default CartContext;
