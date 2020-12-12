import React from 'react';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import * as Views from '~/screens';

const App = createStackNavigator();

const AppStack: React.FC = () => {
  return (
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
    </App.Navigator>
  );
};

export default AppStack;
