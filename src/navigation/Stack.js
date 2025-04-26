import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './TabNav';
import Filter from '../screen/stack/Filter';
import Category from '../screen/stack/Category';
import RecipeCard from '../screen/stack/RecipeCard';
import Favorites from '../screen/stack/Favorites';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="RecipeCard" component={RecipeCard} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

export default StackNav;
