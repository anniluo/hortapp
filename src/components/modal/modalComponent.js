import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import './modalComponent.css';

const Modal = ({ modalHeaderText, hideModalOnClick, formId }) => {
  const [errorMessage, setErrorMessage] = useState('error message will be displayed here');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    checkOtherOpenModals();
  }, []);

  const checkOtherOpenModals = () => {
    const closeModalButton = document.getElementsByClassName('close-modal-button');
    if (closeModalButton.length > 1) {
      closeModalButton[0].click();
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log('signing up  with', email, username, password, confirmPassword);
  };

  const renderErrorMessage = () => {
    return errorMessage !== null ? (
      <div className='modal-error-container'>
        <p className='error-message-text'>{errorMessage}</p>
      </div>
    ) : null;
  };

  return ReactDOM.createPortal(
    <div className='modal-container'>
      <div className='modal-header-container'>
        <h5>{modalHeaderText}</h5>
        <button className='close-modal-button no-border' onClick={hideModalOnClick}></button>
      </div>
      {formId !== '' ? (
        <>
          {renderErrorMessage()}
          <form
            id={formId}
            className='modal-form'
            onSubmit={formId === 'login-form' ? handleLogin : handleSignup}
          >
            <input
              className={formId === 'login-form' ? 'hidden form-input' : 'form-input'}
              type='email'
              placeholder='e-mail'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              className='form-input'
              type='text'
              placeholder='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              className='form-input'
              type='password'
              placeholder='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <input
              className={formId === 'login-form' ? 'hidden form-input' : 'form-input'}
              type='password'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
            <input className='modal-form-submit' type='submit' value='Confirm' />
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
