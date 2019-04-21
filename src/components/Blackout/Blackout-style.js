import styled, { css } from 'styled-components';

export const Blackout = styled.div`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  pointer-events: none;
  transition: opacity .5s ease;
  z-index: 10;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`