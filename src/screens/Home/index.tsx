import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { format, startOfToday } from 'date-fns';
import { pt } from 'date-fns/esm/locale';
import LottieView from 'lottie-react-native';

import { ContainerScroll } from '~/components';
import { usePosition } from '~/hooks/getPosition';
import { fakeData } from '~/utils/fakeData';
import weatherDescription from '~/utils/getWeatherDescription';
import weatherIcon from '~/utils/getWeatherIcon';

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
  TabsContainer,
  TabsTitle,
  Holder,
} from './styles';

import { Today } from './Tabs';

const Home: React.FC = () => {
  const { address } = usePosition();
  const { dispatch } = useNavigation();
  const [opacity] = useState(new Animated.Value(0));
  const [tab, setTab] = useState('today');

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
                source={weatherIcon[fakeData.current.weather[0].main]}
                autoPlay
                loop
              />

              <Weather>{fakeData.current.temp.toFixed()}°</Weather>
            </WeatherWrapper>

            <WeatherDescription>
              {weatherDescription[fakeData.current.weather[0].main]}
            </WeatherDescription>
          </WeatherContainer>

          <TabsContainer>
            <MenuButton onPress={() => setTab('today')}>
              <TabsTitle style={{ opacity: tab === 'today' ? 1 : 0.4 }}>
                Hoje
              </TabsTitle>
            </MenuButton>

            <MenuButton onPress={() => setTab('tomorrow')}>
              <TabsTitle style={{ opacity: tab === 'tomorrow' ? 1 : 0.4 }}>
                Amanhã
              </TabsTitle>
            </MenuButton>

            <MenuButton onPress={() => setTab('next')}>
              <Holder>
                <TabsTitle style={{ opacity: tab === 'next' ? 1 : 0.4 }}>
                  Próximos 7 dias
                </TabsTitle>
                <Ionicons
                  name="ios-arrow-forward"
                  size={22}
                  color="#fff"
                  style={{ marginLeft: 5 }}
                />
              </Holder>
            </MenuButton>
          </TabsContainer>

          {/* {Today()} */}
        </ContainerScroll>
      </Container>
    </Animated.View>
  );
};

export default Home;
