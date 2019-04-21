import styled, { css } from 'styled-components';

export const Sidepanel = styled.div`
  position: fixed;
  right: -100%;
  top: 0;
  background: #fff;
  width: 60vw;
  height: 100vh;
  padding: 60px 20px 20px 20px;
  transition: all .5s ease;
  z-index: 20;
  &.active {
    right: 0;
  }
`;