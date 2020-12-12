import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 35px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 30px 15px 0;
`;

export const GenericButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 18px;
  top: 25%;
`;

export const NameContainer = styled.View`
  padding: 0 10% 10px;
  flex-direction: column;
  align-items: flex-start;
`;

export const Username = styled.Text`
  color: ${({ theme }) => theme.colors.grayDark};
  margin: 10px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.size18};
  font-family: ${({ theme }) => theme.fontFamily.RobotoMedium};
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.shadow};
  width: 100%;
  margin: 15px 0;
`;

export const MenuButton = styled.TouchableOpacity``;

export const TermsContainer = styled.View`
  padding: 10px 10%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const TermsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.grayDark};
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.size13};
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
`;
