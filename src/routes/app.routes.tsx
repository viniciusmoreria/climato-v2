import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import * as Views from '~/screens';
import CustomDrawer from '~/screens/Drawer';

const App = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    }}
  >
    <App.Screen name="Home" component={Views.Home} />
    <App.Screen name="NextDays" component={Views.NextDays} />
  </App.Navigator>
);

const AppRoutes: React.FC = () => (
  <Drawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeStack} />
  </Drawer.Navigator>
);

export default AppRoutes;
