import {NavigationContainer} from '@react-navigation/native';

import StackNav from './src/navigation/Stack';
import {StoreProvider} from './src/store/context';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StackNav />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
