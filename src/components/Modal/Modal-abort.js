import React  from 'react';
import Modal from './Modal';
import { Button } from '../Button/Button';

const AbortModal = (props) => {
  
  return (
    <Modal>
      <h2>Are you sure ?</h2>
      <p>Quit without saving?</p>
      <Button onClick={props.abort}>Abort</Button>
      <Button onClick={props.accept}>Yes</Button>
    </Modal>
  );
} 

export default AbortModal;