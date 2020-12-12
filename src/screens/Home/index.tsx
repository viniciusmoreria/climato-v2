import React from 'react';

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

  return (
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
  );
};

export default Home;
