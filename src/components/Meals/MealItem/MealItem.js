import { useContext } from 'react';

import styles from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const addItemHandler = (amount) => {
    cartCtx.addItem({ ...meal, amount });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>${meal.price}</div>
      </div>
      <MealItemForm mealId={meal.id} onAddItem={addItemHandler} />
    </li>
  );
};

export default MealItem;
