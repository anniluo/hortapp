import React from 'react';
import ReactDOM from 'react-dom';
import './modalComponent.css';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className='modal-container'>{children}</div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
