import { useState } from 'react';
import { useEffect } from 'react';

import styles from './AvailableMeals.module.css';
import { API_URL } from '../../assets/variables';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/meals.json`);
        if (!response.ok) {
          throw Error('Fetching data failed.');
        }
        const data = await response.json();
        const transformedData = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });
        setMeals(transformedData);
      } catch (err) {
        setError(
          `Error: ${!!err.message ? err.message : 'Something went wrong.'}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

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
