import { useState } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = ({ mealId, onAddItem }) => {
  const [amount, setAmount] = useState(0);

  const changeAmountHandler = (event) => {
    setAmount(+event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (amount <= 0) {
      return;
    }
    onAddItem(amount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        id={`input${mealId}`}
        label="Amount"
        type="number"
        min={1}
        onChange={changeAmountHandler}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
