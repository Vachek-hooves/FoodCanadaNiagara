import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './TabNav';
import Filter from '../screen/stack/Filter';
import Category from '../screen/stack/Category';
import RecipeCard from '../screen/stack/RecipeCard';
import Favorites from '../screen/stack/Favorites';
import ContactWithUs from '../screen/stack/ContactWithUs';
import CreateNote from '../screen/stack/CreateNote';
import NotesDetailsCard from '../screen/stack/NotesDetailsCard';
import CreateRecipe from '../screen/stack/CreateRecipe';
import CustomRecipeCard from '../components/CustomRecipeCard';
import RecipeDetailsCard from '../screen/stack/RecipeDetailsCard';
import DeletedCard from '../components/DeletedCard';
import Onboard from '../screen/stack/Onboard';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="RecipeCard" component={RecipeCard} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="ContactWithUs" component={ContactWithUs} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
      <Stack.Screen name="NotesDetailsCard" component={NotesDetailsCard} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
      <Stack.Screen name="CustomRecipeCard" component={CustomRecipeCard} />
      <Stack.Screen name="RecipeDetailsCard" component={RecipeDetailsCard} />
      <Stack.Screen name="DeletedCard" component={DeletedCard} />
    </Stack.Navigator>
  );
};

export default StackNav;
