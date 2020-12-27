import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size24};
  font-family: ${({ theme }) => theme.fontFamily.RobotoBold};
  text-align: center;
  padding-bottom: 10px;
`;

export const Subtitle = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
`;

export const FormWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Address = styled(Subtitle)`
  color: ${({ theme }) => theme.colors.green};
  margin-top: 30px;
`;
