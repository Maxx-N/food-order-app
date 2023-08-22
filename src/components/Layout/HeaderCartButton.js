import { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({ onOpenCart }) => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfMealsInTheCart = cartCtx.items
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);

  let btnClasses = styles.button;
  if (isBtnHighlighted) {
    btnClasses += ` ${styles.bump}`;
  }

  useEffect(() => {
    if (cartCtx.items === 0) {
      return;
    }

    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={onOpenCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfMealsInTheCart}</span>
    </button>
  );
};

export default HeaderCartButton;
