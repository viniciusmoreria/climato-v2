import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const Touchable = styled.TouchableOpacity`
  padding: 10px 5px;
  align-self: flex-end;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size22};
  font-family: ${({ theme }) => theme.fontFamily.RobotoBold};
  text-align: center;
  padding-bottom: 10px;
`;

export const Subtitle = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
  margin-top: 10px;
`;

export const FormWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 40px 30px;
`;

export const Address = styled(Subtitle)`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  margin-top: 30px;
`;
