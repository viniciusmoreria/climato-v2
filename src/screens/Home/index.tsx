import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { ContainerScroll } from '~/components';

import {
  Container,
  Header,
  LocationContainer,
  City,
  State,
  Date,
} from './styles';

const Home: React.FC = () => {
  const { dispatch } = useNavigation();
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity,
      }}
    >
      <Container>
        <Header onPress={() => dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="ios-menu" size={36} color="#fff" />
        </Header>

        <ContainerScroll>
          <LocationContainer>
            <City>London,</City>

            <State>United Kingdom</State>

            <Date>Sat, 6 Aug</Date>
          </LocationContainer>
        </ContainerScroll>
      </Container>
    </Animated.View>
  );
};

export default Home;
