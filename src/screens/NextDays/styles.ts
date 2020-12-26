import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
`;

export const WeatherCard = styled.View`
  height: 60px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size24};
  font-family: ${({ theme }) => theme.fontFamily.RobotoBold};
  text-align: center;
  padding-bottom: 10px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Hour = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  text-transform: capitalize;
`;

export const Temp = styled(Hour)`
  font-family: ${({ theme }) => theme.fontFamily.RobotoExtraBold};
  margin-left: 15px;
`;
