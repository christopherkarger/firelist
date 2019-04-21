import React  from 'react';
import Modal from './Modal';
import { Button } from '../Button/Button';

const AbortModal = (props) => {
  
  return (
    <Modal>
      <h2>Sind Sie sicher ?</h2>
      <p>Beenden ohne speichern?</p>
      <Button onClick={props.abort}>Abbrechen</Button>
      <Button onClick={props.accept}>Ja</Button>
    </Modal>
  );
} 

export default AbortModal;