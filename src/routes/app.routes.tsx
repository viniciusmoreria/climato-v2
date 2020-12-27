import React from 'react';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import * as Views from '~/screens';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.ModalPresentationIOS,
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    }}
  >
    <App.Screen name="Home" component={Views.Home} />
    <App.Screen name="NextDays" component={Views.NextDays} />
    <App.Screen name="NoLocation" component={Views.NoLocation} />
    <App.Screen name="NewLocation" component={Views.NewLocation} />
  </App.Navigator>
);

export default AppRoutes;
