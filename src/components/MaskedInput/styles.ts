import styled, { css } from 'styled-components/native';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 40px;
  margin: 15px 0 0;
  flex-direction: row;
  align-items: center;
  border-width: 0.3px;
  border-color: #fff;
  border-radius: 20px;
  background-color: #eee;
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #29c872;
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #e20613;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  padding: 0 16px;
  font-family: ${({ theme }) => theme.fontFamily.RobotoRegular};
  text-align: center;
`;
