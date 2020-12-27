import React from 'react';
import { View } from 'react-native';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import LottieView from 'lottie-react-native';

import { SplashAnimation } from '~/assets/animations';
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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#719DFC',
        }}
      >
        <LottieView source={SplashAnimation} autoPlay loop />
      </View>
    );
  }

  return <AppRoutes />;
};

export default Routes;
