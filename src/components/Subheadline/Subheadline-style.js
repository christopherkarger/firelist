import styled, { css } from 'styled-components';
import colors from '../../colors';
import flame from '../../assets/img/flame2.svg';

export const Subheadline = styled.h2`
  position: relative;
  font-size: 20px;
  line-height: 25px;
  font-weight: 400;
  margin-bottom: 25px;
  color: ${colors.grey};
  padding-left: 33px;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -3px;
    left: 0px;
    width: 20px;
    height: 30px;
    background: url(${flame}) 0 0 no-repeat;
    background-size: 100% auto;  
  }
`