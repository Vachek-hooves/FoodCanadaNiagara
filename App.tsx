import {NavigationContainer} from '@react-navigation/native';

import StackNav from './src/navigation/Stack';
import {StoreProvider} from './src/store/context';
import Onboard from './src/screen/stack/Onboard';
import Onb from './src/screen/stack/Onboard';

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
