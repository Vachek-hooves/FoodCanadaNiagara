import {NavigationContainer} from '@react-navigation/native';
import TabNav from './src/navigation/TabNav';
import StackNav from './src/navigation/Stack';

const App = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;
