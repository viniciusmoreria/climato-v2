import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText, LinearContainer } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <LinearContainer>
      <Container {...rest}>
        <ButtonText>{children}</ButtonText>
      </Container>
    </LinearContainer>
  );
};

export default Button;
