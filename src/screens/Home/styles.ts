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

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 0;
  width: 100%;
`;

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
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
`;
