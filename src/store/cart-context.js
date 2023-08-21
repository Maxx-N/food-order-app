import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalPrice: 0,
});

export default CartContext;
