import styled from 'styled-components';
import colors from '../../colors';

export const CheckSymbol = styled.div`
  position: absolute;
  width: 11px;
  height: 5px;
  border: 2px solid ${colors.red};
  border-top: none;
  border-right: none;
  transform: rotate(-45deg) translateX(-50%) translateY(-50%);
  top: 8px;
  left: 50%;
`;
