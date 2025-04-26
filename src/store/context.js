import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  const value = {favorites, setFavorites};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
