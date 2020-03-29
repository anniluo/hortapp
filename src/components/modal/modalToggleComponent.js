import React, { useState } from 'react';
import './modalComponent.css';

const ModalToggle = ({ toggle, content }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const hideModal = () => setModalIsOpen(false);
  const showModal = () => {
    console.log('setting the modalIsOpen to true');
    setModalIsOpen(true);
  };

  return (
    <>
      {toggle(showModal)}
      {modalIsOpen && content(hideModal)}
    </>
  );
};

export default ModalToggle;
