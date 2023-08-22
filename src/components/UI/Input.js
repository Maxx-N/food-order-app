import { forwardRef } from 'react';

import style from './Input.module.css';

const Input = forwardRef(({ id, label, input }, ref) => {
  return (
    <div className={style.input}>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} id={id} {...input} />
    </div>
  );
});

export default Input;
