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

    modalBackground.classList.contains('hidden-modal-background')
      ? modalBackground.classList.remove('hidden-modal-background')
      : modalBackground.classList.add('hidden-modal-background');
  };

  return (
    <>
      {toggle(showModal)}
      {modalIsOpen && content(hideModal)}
    </>
  );
};

export default ModalToggle;
