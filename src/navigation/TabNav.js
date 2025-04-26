import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Receipts from '../screen/tab/Receipts';
import Notes from '../screen/tab/Notes';
import Settings from '../screen/tab/Settings';

import Home from '../screen/tab/Home';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/tab/home.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={Receipts}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/tab/recipe.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/tab/notes.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/tab/settings.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1C5839',
    borderTopWidth: 0,
    height: 118,
    paddingBottom: 5,
    paddingTop: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TabNav;
