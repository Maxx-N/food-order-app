import { useState } from 'react';

import CartContext from './cart-context';

const INITIAL_CART = {
  items: [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
      amount: 2,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
      amount: 3,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
      amount: 4,
    },
  ],
  totalPrice: 0,
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(INITIAL_CART);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export default CartProvider;
