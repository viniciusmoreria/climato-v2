/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

import { ContainerScroll } from '~/components';

import {
  Container,
  HeaderContainer,
  GenericButton,
  NameContainer,
  Username,
  Divider,
  MenuButton,
  TermsContainer,
  TermsTitle,
} from './styles';

const CustomDrawer: React.ReactNode = ({ navigation }: any) => (
  <ContainerScroll>
    <Container>
      <HeaderContainer>
        <GenericButton
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons
            name="ios-close"
            style={{
              fontSize: 35,
              color: '#292929',
            }}
          />
        </GenericButton>
      </HeaderContainer>

      <NameContainer>
        <Username>Olá!</Username>
      </NameContainer>

      <Divider />

      <TermsContainer>
        <MenuButton>
          <TermsTitle>Sobre o Climato</TermsTitle>
        </MenuButton>

        <MenuButton>
          <TermsTitle>Termos e Condições</TermsTitle>
        </MenuButton>

        <MenuButton>
          <TermsTitle>Política de Privacidade</TermsTitle>
        </MenuButton>
      </TermsContainer>
    </Container>
  </ContainerScroll>
);

export default CustomDrawer;
