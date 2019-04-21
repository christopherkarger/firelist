import styled, { css } from 'styled-components';
import colors from '../../colors';

export const BigHeadline = styled.h1`
  position: relative;
  font-size: 40px;
  line-height: 42px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 20px;
  color: ${colors.darkgrey};
  ${props =>
    props.withBorder &&
    css`
      &:after {
        content: '';
        display: block;
        width: 80px;
        height: 2px;
        background: ${colors.red};
        position: absolute;
        bottom: 0;
        left: 0;
      }
  `}
  
  span {
    display: block;  
  }

`