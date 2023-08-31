import { useCallback, useEffect, useMemo, useState } from 'react';

import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformDataAndSetMeals = useCallback((data) => {
    const transformedData = Object.keys(data).map((key) => {
      return {
        id: key,
        ...data[key],
      };
    });
    setMeals(transformedData);
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchMeals,
  } = useHttp({
    endPoint: 'meals',
    errorMessage: 'Fetching data failed.',
    responseOkFn: transformDataAndSetMeals,
  });

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!!error) {
    content = <p className={styles['error-message']}>{error}</p>;
  } else {
    content = (
      <ul>
        {meals.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })}
      </ul>
    );
  }

  return <Card className={styles.meals}>{content}</Card>;
};

export default AvailableMeals;
