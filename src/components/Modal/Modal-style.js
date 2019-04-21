import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.2);
  z-index: 10;

  & > div {
    background: #fff;
    max-width: 80%;
    padding: 20px;
    box-shadow: 0px 0px 12px -6px rgba(0,0,0,0.75);
  }
`;