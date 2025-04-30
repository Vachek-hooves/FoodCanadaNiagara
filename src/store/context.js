import {createContext, useContext, useState} from 'react';
import {dishes} from '../data/dishes';
export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [commonFilter, setCommonFilter] = useState(dishes);
  const [filterIcon, setFilterIcon] = useState(false);

  const value = {
    favorites,
    setFavorites,
    commonFilter,
    setCommonFilter,
    filterIcon,
    setFilterIcon,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
