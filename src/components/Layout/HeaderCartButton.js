import { useContext } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({ onOpenCart }) => {
  const cartCtx = useContext(CartContext);

  return (
    <button className={styles.button} onClick={onOpenCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
        {cartCtx.items
          .map((item) => item.amount)
          .reduce((prev, curr) => prev + curr)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
