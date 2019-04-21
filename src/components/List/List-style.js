import styled, { css } from 'styled-components';
import colors from '../../colors';

const sharedStyles = css`
  margin: 0 -20px;
  padding: 0;
  list-style: none;

  li {
    position: relative;
  }
  li:nth-child(odd) {
    background: ${colors.lightgrey};
  }
  a {
    display: block;
    padding: 14px 50px 14px 20px;
    position: relative;
    text-decoration: none;
    font-size: 17px;
    color: ${colors.darkgrey}
  }
`;

export const ListToDo = styled.ul`
  ${sharedStyles}
  li {
    display: flex;
  }
  a {
    padding-left: 0;
    flex: 1 1 auto;
  }
`;

export const List = styled.ul`
  ${sharedStyles}

  ${props =>
    props.myList &&
    css`
      margin-bottom: 50px;
  `}

  ${props =>
    props.share &&
    css`
      li {
        padding: 14px 40px 14px 20px;
      }
  `}
    
`