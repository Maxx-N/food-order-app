import styles from './CartItem.module.css';

const CartItem = ({ name, price, amount }) => {
  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <div className={styles.price}>${price}</div>
          <div className={styles.amount}>x {amount}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button>-</button>
        <button>+</button>
      </div>
    </li>
  );
};

export default CartItem;
