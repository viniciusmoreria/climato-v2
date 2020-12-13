import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled(LinearGradient).attrs({
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
  colors: ['#346DEE', '#719DFC'],
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 0;
  width: 100%;
`;

export const MenuButton = styled.TouchableOpacity``;

export const LocationContainer = styled.View`
  width: 100%;
`;

export const City = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size24};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
`;

export const State = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size24};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  margin: 7px 0;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size14};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
  text-transform: capitalize;
`;

export const WeatherContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;

export const WeatherWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

export const GreetingText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size28};
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
  margin: 7px 0;
`;

export const Weather = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 55px;
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
  margin-left: 10px;
`;

export const WeatherDescription = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size18};
  font-family: ${({ theme }) => theme.fontFamily.RobotoLight};
  margin: 7px 0;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 30px;
`;

export const TabsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size18};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  margin: 7px 0;
`;

export const Holder = styled.View`
  flex-direction: row;
  align-items: center;
`;
