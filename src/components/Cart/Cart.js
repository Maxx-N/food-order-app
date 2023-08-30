import { useContext, useState } from 'react';

import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);

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

  return (
    <Modal onCloseModal={onCloseCart}>
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
      {isOrdering && <Checkout onCancel={cancelHandler} />}
      {!isOrdering && (
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={onCloseCart}>
            Close
          </button>
          <button className={styles.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
