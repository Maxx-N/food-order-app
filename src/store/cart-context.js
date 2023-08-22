import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
});

export default CartContext;
