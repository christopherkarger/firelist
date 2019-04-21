import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  flex: 1 1 auto;

  ${props =>
    props.Login &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
    `};
`;