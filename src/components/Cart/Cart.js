import { useContext, useState } from 'react';

import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { isLoading, error, sendRequest } = useHttp({
    endPoint: 'orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    errorMessage: 'Sending order to the server failed.',
    responseOkFn: () => {
      setIsSent(true);
      cartCtx.resetCart();
    },
  });

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsOrdering(true);
  };

  const cancelHandler = () => {
    setIsOrdering(false);
  };

  const submitOrderHandler = async (userInfo) => {
    const order = {
      customer: userInfo,
      cart: cartCtx.items,
    };

    sendRequest(order);

    setIsOrdering(false);
  };

  const actionButtons = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={onCloseCart}>
        Close
      </button>
      {!isLoading && !error && !isSent && (
        <button
          className={styles.button}
          onClick={orderHandler}
          disabled={cartCtx.totalPrice === 0}
        >
          Order
        </button>
      )}
    </div>
  );

  let content = (
    <>
      <ul className={styles['cart-items']}>
        {' '}
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              onAdd={() => {
                addItemHandler(item);
              }}
              onRemove={() => removeItemHandler(item.id)}
            />
          );
        })}
      </ul>
      <div className={styles.total}>
        <span>Total Price</span>
        <span>${cartCtx.totalPrice.toFixed(2)}</span>
      </div>
      {isOrdering && (
        <Checkout
          onConfirm={(userInfo) => submitOrderHandler(userInfo)}
          onCancel={cancelHandler}
        />
      )}
    </>
  );
  if (isLoading) {
    content = <p className={styles['loading-message']}>Sending order...</p>;
  } else if (!!error) {
    content = <p className={styles['error-message']}>{error}</p>;
  } else if (isSent) {
    content = (
      <p className={styles['success-message']}>
        Your order has been successfully sent!
      </p>
    );
  }

  return (
    <Modal onCloseModal={onCloseCart}>
      {content}
      {!isOrdering && actionButtons}
    </Modal>
  );
};

export default Cart;
