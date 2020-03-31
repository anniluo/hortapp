import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modalComponent.css';

const Modal = ({ modalHeaderText, hideModalOnClick, formId }) => {
  useEffect(() => {
    checkOtherOpenModals();
  }, []);

  const checkOtherOpenModals = () => {
    const closeModalButton = document.getElementsByClassName('close-modal-button');
    if (closeModalButton.length > 1) {
      closeModalButton[0].click();
    }
  };

  return ReactDOM.createPortal(
    <div className='modal-container'>
      <div className='modal-header-container'>
        <h5>{modalHeaderText}</h5>
        <button className='close-modal-button no-border' onClick={hideModalOnClick}></button>
      </div>
      {formId !== '' ? (
        <>
          <div className='modal-error-container'>
            <p>Error message will be dispayled here</p>
          </div>
          <form id={formId} className='modal-form'>
            <input
              className={formId === 'login-form' ? 'hidden form-input' : 'form-input'}
              type='email'
              placeholder='e-mail'
            />
            <input className='form-input' type='text' placeholder='username' />
            <input className='form-input' type='password' placeholder='password' />
            <input
              className={formId === 'login-form' ? 'hidden form-input' : 'form-input'}
              type='password'
              placeholder='confirm password'
            />
            <input
              onClick={hideModalOnClick}
              className='modal-form-submit'
              type='submit'
              value='Confirm'
            />
          </form>
        </>
      ) : (
        <div className='about-app-container'>Here I'll write a small description of the app</div>
      )}
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
