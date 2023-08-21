import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ meal }) => {
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>${meal.price}</div>
      </div>
      <MealItemForm mealId={meal.id} />
    </li>
  );
};

export default MealItem;
