import styles from './CartItem.module.css';

const CartItem = ({ name, price, amount, onAdd, onRemove }) => {
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
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
