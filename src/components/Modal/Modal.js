import React  from 'react';
import { ModalWrapper } from './Modal-style';

const Modal = (props) => {
  
  return (
    <ModalWrapper>
      <div>
        { props.children }
      </div>
    </ModalWrapper>
  );
} 

export default Modal;