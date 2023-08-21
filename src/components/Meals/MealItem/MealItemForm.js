import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({ mealId }) => {
  return (
    <form className={styles.form}>
      <Input id={`input${mealId}`} label="Amount" type="number" />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
