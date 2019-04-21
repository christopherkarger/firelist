import styled, { css } from 'styled-components';
import colors from '../../colors';

const sharedStyle = css`
  cursor: pointer;
  position: relative;
  outline: 0;
  border: 0;
  background: none;
  span { display: none; }
`;

export const Button = styled.button`
  ${sharedStyle}
  border-radius: 17px;
  color: #fff;
  background: ${colors.red};
  margin: 0;
  padding: 0.6em 1.6em;
  font-size: 17px;
  ${ props => props.fullWith && css`
    width: 100%;
  `

  }  
`;

export const SidebarTogler = styled.button`
  ${sharedStyle}
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  padding: 0;
  width: 50px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center; 
  z-index: 100;
  span {
    display: block;
  }
  .text {
    display: none;
  }

  .dot {
    display: flex;
    &,
    &:before,
    &:after {
      width: 8px;
      height: 8px;
      background: ${colors.grey};
      color: ${colors.grey};
      border-radius: 50%;
    }

    &:before,
    &:after {
      content: '';
      flex: 0 0 auto;
      display: block;
      position: relative;
    }

    &:before { left: -14px; }
    &:after { left: 6px; }
  
  }

  &.active {
    .dot {
      background: none;
      width: 50px;
      align-items: center;
      justify-content: center;
      &:before {
        font-size: 24px;
        left: 0;
        content: '\f00d';
        font-family: 'Font Awesome 5 Free';
        background: none;
        width: auto;
        height: auto;
      }
      
      &:after {
        display: none;
      }
    }
  }

`;


export const AddTodoListButton = styled.button`
  ${sharedStyle}
  position: absolute;
  background: ${colors.red};
  bottom: 40px;
  left: 50%;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  padding: 0;
  transform: translateX(-50%);
  &:before {
    content: '\f067';
    font-family: 'Font Awesome 5 Free';
    font-size: 42px;
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }

`;

export const RemoveButton = styled.button`
  ${sharedStyle}
  background: none;
  padding: 0 10px;
  color: ${colors.darkgrey};
  opacity: .4;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  &:before {
    content: '\f00d';
    font-size: 24px;
    font-family: 'Font Awesome 5 Free';
  }

`;

export const BackButton = styled.button`
  ${sharedStyle}
  position: absolute;
  top: 14px;
  left: 7px;
  background: none;
  padding: 0 10px;
  &:before {
    content: '\f060';
    font-size: 24px;
    font-family: 'Font Awesome 5 Free';
    color: ${colors.grey};
  }
`;

export const CheckButton = styled.button`
  ${sharedStyle}
  background: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${colors.grey};
  margin: 10px 10px 0 20px;
  &.done {
    &:before {
      content: '';
      position: absolute;
      width: 11px;
      height: 5px;
      border: 2px solid ${colors.red};
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      top: 8px;
      left: 7px;
    }
  }

`;


export const ImageUploadButton = styled.label`
  ${sharedStyle}
  padding: 0 10px;
  background: none;
  border-radius: 50%;
  &:before {
    content: '\f030';
    color: ${colors.grey};
    font-family: 'Font Awesome 5 Free';
    font-size: 20px;
  }
  & + input {
    display: none;
  }
`;

export const ShareButton = styled.button`
  ${sharedStyle}
  position: absolute;
  top: 20px;
  right: 17px;
  padding: 0 10px;
  background: none;

  &:before {
    content: '\f1e0';
    color: ${colors.grey};
    font-family: 'Font Awesome 5 Free';
    font-size: 22px;
  }
`;

