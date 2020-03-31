import React, { useState, useEffect } from 'react';
import './modalComponent.css';

const ModalToggle = ({ toggle, content }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const hideModal = () => setModalIsOpen(false);
  const showModal = () => {
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
