import React from 'react';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

import { usePosition } from '~/hooks/getPosition';

import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { loading } = usePosition();

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (loading || !fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return <AppRoutes />;
};

export default Routes;
