import styles from './Cart.module.css';
import Modal from '../UI/Modal';

const Cart = ({ onCloseCart }) => {
  return (
    <Modal onCloseModal={onCloseCart}>
      <ul className={styles['cart-items']}></ul>
      <div className={styles.total}>0</div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onCloseCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
