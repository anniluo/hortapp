import React, { useState } from 'react';
import './modalComponent.css';

const ModalToggle = ({ toggle, content }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const hideModal = () => {
    toggleModalBackground();
    setModalIsOpen(false);
  };
  const showModal = () => {
    toggleModalBackground();
    setModalIsOpen(true);
  };

  const toggleModalBackground = () => {
    const modalBackground = document.getElementById('modal-background');

    if (modalBackground.style.display === '' || modalBackground.style.display === 'none') {
      modalBackground.style.display = 'inherit';
    } else {
      modalBackground.style.display = 'none';
    }
  };

  return (
    <>
      {toggle(showModal)}
      {modalIsOpen && content(hideModal)}
    </>
  );
};

export default ModalToggle;
