import { useState } from 'react';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCartHandler = () => {
    setIsModalOpen(true);
  };

  const closeCartHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <Cart onCloseCart={closeCartHandler} />}
      <Header onOpenCart={openCartHandler} />
      <Meals />
    </>
  );
}

export default App;
