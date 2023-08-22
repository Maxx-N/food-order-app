import { useRef } from 'react';

import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({ mealId, onAddItem }) => {
  const amountInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = +amountInput.current.value;
    if (amount <= 0) {
      return;
    }
    onAddItem(amount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInput}
        id={`inputAmount${mealId}`}
        label="Amount"
        input={{ type: 'number', min: '1', max: '5', defaultValue: '1' }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
