import React from 'react';

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import { usePosition } from '~/hooks/getPosition';

import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { loading } = usePosition();

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (loading || !fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return <AppRoutes />;
};

export default Routes;
