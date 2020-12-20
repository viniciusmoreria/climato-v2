import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  height: ${height * 0.3}px;
  width: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-top: 40px;
  margin-bottom: 60px;
`;

export const WeatherCard = styled.View`
  height: 100%;
  width: 100%;
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
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
`;
