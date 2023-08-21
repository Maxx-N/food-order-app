import styles from './AvailableMeals.module.css';
import meals from '../../assets/dummy-meals';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {
  return (
    <Card className={styles.meals}>
      <ul>
        {meals.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
