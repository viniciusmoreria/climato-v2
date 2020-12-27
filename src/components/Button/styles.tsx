import styled from 'styled-components/native';

export const LinearContainer = styled.View`
  background-color: #6f9bfc;
  border-radius: 20px;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.size15};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
  text-align: center;
`;
