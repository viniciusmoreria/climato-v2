import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';

import { PositionProvider } from './hooks/getPosition';
import Routes from './routes';

const App: React.FC = () => {
  const [theme] = useState(light);

  useEffect(() => {
    async function updateApp() {
      if (!__DEV__) {
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();

          await Updates.reloadAsync();
        }
      }
    }

    updateApp();
  }, []);

  return (
    <NavigationContainer>
      <PositionProvider>
        <ThemeProvider theme={theme}>
          <StatusBar hidden />
          <Routes />
        </ThemeProvider>
      </PositionProvider>
    </NavigationContainer>
  );
};

export default App;
