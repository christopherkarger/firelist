import styled, { css } from 'styled-components';
import colors from '../../colors';

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
  color: ${colors.darkgrey};
`;

export const ListTitleInput = styled.input`
  display: block;
  font-size: 40px;
  line-height: 42px;
  font-weight: bold;
  margin-bottom: 30px;
  background: none;
  border: 0;
  outline: 0;
  width: calc(100% - 50px);
  height: 50px;
  color: ${colors.darkgrey};
`;

export const BigInputWithBorder = styled.input`
  display: block;
  background: none;
  border: 2px solid ${colors.grey};
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  margin: 0 0 20px 0;
  outline: 0;
  font-size: 16px;
`;