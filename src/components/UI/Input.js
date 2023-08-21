import style from './Input.module.css';

const Input = ({ id, label, type }) => {
  return (
    <div className={style.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
};

export default Input;
