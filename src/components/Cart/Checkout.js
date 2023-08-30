import styles from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = (value) => {
  return value !== '';
};

const has5Characters = (value) => {
  return value.length === 5;
};

const Checkout = ({ onCancel, onConfirm }) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    formControlClasses: nameControlClasses,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(isNotEmpty, styles);
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    formControlClasses: streetControlClasses,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
  } = useInput(isNotEmpty, styles);
  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    formControlClasses: postalControlClasses,
    changeHandler: postalChangeHandler,
    blurHandler: postalBlurHandler,
  } = useInput(has5Characters, styles);
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    formControlClasses: cityControlClasses,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
  } = useInput(isNotEmpty, styles);

  const isFormValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalValue,
      city: cityValue,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <div className={styles['error-message']}>
            Please enter a valid name
          </div>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <div className={styles['error-message']}>
            Please enter a valid street
          </div>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <div className={styles['error-message']}>
            Please enter a valid postal code
          </div>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <div className={styles['error-message']}>
            Please enter a valid city
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
