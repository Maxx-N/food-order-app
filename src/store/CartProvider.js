import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedState = { ...state };

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    if (!!existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedState.items[existingItemIndex] = updatedItem;
    } else {
      updatedState.items.push(action.item);
    }

    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;
    updatedState.totalPrice = +updatedTotalPrice.toFixed(2);

    return updatedState;
  }

  if (action.type === 'REMOVE') {
    const updatedState = { ...state };

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem.amount === 1) {
      updatedState.items = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedState.items[existingItemIndex] = updatedItem;
    }

    const updatedTotalPrice = state.totalPrice - existingItem.price;
    updatedState.totalPrice = +updatedTotalPrice.toFixed(2);

    return updatedState;
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

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
  };

  const cartCtx = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
