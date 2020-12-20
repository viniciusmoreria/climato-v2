import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  height: ${width * 0.5}px;
  width: 100%;
  background-color: rgb(117, 160, 255);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-top: 15px;
  margin-bottom: 60px;
`;

export const WeatherCard = styled.View`
  height: ${width * 0.35}px;
  width: ${width * 0.18}px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 40px;
  background-color: #3f76f2;
  padding: 20px;
  margin-left: 25px;
`;

export const Hour = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
`;

export const Temp = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
`;
