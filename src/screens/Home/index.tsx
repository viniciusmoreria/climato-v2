import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { format, startOfToday } from 'date-fns';
import { pt } from 'date-fns/esm/locale';
import LottieView from 'lottie-react-native';

import { SunnyAnimation } from '~/assets/animations';
import { ContainerScroll } from '~/components';
import { usePosition } from '~/hooks/getPosition';
import { fakeData } from '~/utils/fakeData';
import weatherDescription from '~/utils/getWeatherDescription';

import {
  Container,
  Header,
  MenuButton,
  LocationContainer,
  City,
  State,
  Date,
  WeatherContainer,
  GreetingText,
  WeatherWrapper,
  Weather,
  WeatherDescription,
} from './styles';

const Home: React.FC = () => {
  const { address } = usePosition();
  const { dispatch } = useNavigation();
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        flex: 1,
        width: '100%',
        opacity,
      }}
    >
      <Container>
        <Header>
          <MenuButton>
            <Ionicons
              name="ios-search"
              size={28}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          </MenuButton>

          <MenuButton onPress={() => dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="ios-menu" size={36} color="#fff" />
          </MenuButton>
        </Header>

        <ContainerScroll>
          <LocationContainer>
            <City>{address?.city},</City>

            <State>{address?.state}</State>

            <Date>
              {format(startOfToday(), 'eee, dd MMM', {
                locale: pt,
              })}
            </Date>
          </LocationContainer>

          <WeatherContainer>
            <GreetingText>Hoje</GreetingText>

            <WeatherWrapper>
              <LottieView
                style={{ height: 100 }}
                source={SunnyAnimation}
                autoPlay
                loop
              />

              <Weather>{fakeData.current.temp.toFixed()}°</Weather>
            </WeatherWrapper>

            <WeatherDescription>
              {weatherDescription[fakeData.current.weather[0].main]}
            </WeatherDescription>
          </WeatherContainer>
        </ContainerScroll>
      </Container>
    </Animated.View>
  );
};

export default Home;
