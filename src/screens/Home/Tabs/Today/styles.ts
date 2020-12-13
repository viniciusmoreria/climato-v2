import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 40%;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 30px;
  margin-top: 15px;
`;
