import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${getStatusBarHeight() + 20}px;
  width: 100%;
  padding-right: 20px;
`;

export const City = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size18};
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
`;

export const State = styled(City)`
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
`;

export const CurrentDate = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
  align-self: flex-start;
`;

export const TempFeelsLike = styled(CurrentDate)`
  align-self: auto;
`;

export const ImageBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
  borderRadius: 20,
})`
  width: 100%;
`;

export const WeatherContainer = styled.ImageBackground.attrs({
  resizeMode: 'cover',
  borderRadius: 20,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgb(88, 115, 252);
  border-radius: 25px;
  margin: 40px 20px 30px;
  padding: 20px;
  height: 25%;
`;

export const WeatherWrapper = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

export const GreetingText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size28};
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
`;

export const WeatherTemp = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 75px;
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
`;

export const WeatherDescription = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size22};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  margin: 7px 0;
`;

export const WeatherDetailsCard = styled.View.attrs({
  shadowColor: '#65737E',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 20px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 25px;
  padding: 25px 10px;
`;

export const WeatherDetailsHolder = styled.View`
  align-items: flex-start;
  width: 80px;
`;

export const WeatherDetailsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
`;

export const WeatherDetailsDescription = styled(WeatherDetailsTitle)`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoBold};
  margin-top: 5px;
`;
