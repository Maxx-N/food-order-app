import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = ({onOpenCart}) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onOpenCart={onOpenCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="meals" />
      </div>
    </>
  );
};

export default Header;
