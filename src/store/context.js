import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useState} from 'react';
import {dishes} from '../data/dishes';
export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [commonFilter, setCommonFilter] = useState(dishes);

  const value = {favorites, setFavorites, commonFilter, setCommonFilter};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
