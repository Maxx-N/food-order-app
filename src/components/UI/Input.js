import style from './Input.module.css';

const Input = ({ id, label, type, onChange, min }) => {
  return (
    <div className={style.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} onChange={onChange} min={min} />
    </div>
  );
};

export default Input;
