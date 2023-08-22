import { useReducer } from 'react';

import CartContext from './cart-context';
import { type } from '@testing-library/user-event/dist/type';

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    const newState = { ...state };
    if (!!existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      newState.items[existingItemIndex] = updatedItem;
    } else {
      newState.items.push(action.item);
    }

    const newTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;
    newState.totalPrice = +newTotalPrice.toFixed(2);
    return newState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item });
  };

  const cartCtx = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
