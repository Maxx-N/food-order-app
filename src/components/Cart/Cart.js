import { useContext, useState } from 'react';

import styles from './Cart.module.css';
import { API_URL } from '../../assets/variables';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);

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

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/orders.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw Error('Sending order to the server failed.');
      }
      setIsSent(true);
      cartCtx.resetCart();
    } catch (err) {
      let error = 'Error: ';
      error += !!err.message ? err.message : 'Something went wrong.';
      setError(error);
    } finally {
      setIsLoading(false);
    }

    setIsOrdering(false);
  };

  let actionButtons = (
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
