import { useState } from 'react';

const useInput = (validatorFn, styles) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validatorFn(value);
  const hasError = !isValid && isTouched;
  const formControlClasses = `${styles.control}${
    hasError ? ` ${styles.invalid}` : ''
  }`;

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    value,
    isValid,
    hasError,
    formControlClasses,
    changeHandler,
    blurHandler,
  };
};

export default useInput;
