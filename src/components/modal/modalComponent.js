import React from 'react';
import './modalComponent.css';

const Modal = ({
  isLoginModalOpen,
  isSignupModalOpen,
  setIsLoginModalOpen,
  setIsSignupModalOpen
}) => {
  const signupForm = () => {
    return (
      <form id='singup-form' className='modal-form'>
        <input className='modal-form-input' type='email' placeholder='e-mail'></input>
        <input className='modal-form-input' type='text' placeholder='username'></input>
        <input className='modal-form-input' type='text' placeholder='password'></input>
        <input className='modal-form-input' type='text' placeholder='confirm password'></input>
        <input
          onClick={closeModal}
          className='modal-form-input round-button'
          type='submit'
          value='Confirm'
        ></input>
      </form>
    );
  };

  const loginForm = () => {
    return (
      <form id='login -form' className='modal-form'>
        <input className='modal-form-input' type='text' placeholder='username'></input>
        <input className='modal-form-input' type='text' placeholder='password'></input>
        <input
          onClick={closeModal}
          className='modal-form-input round-button'
          type='submit'
          value='Confirm'
        ></input>
      </form>
    );
  };

  const closeModal = () => {
    console.log('closing the modal');
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const renderForm = () => {
    return isLoginModalOpen ? loginForm() : isSignupModalOpen ? signupForm() : null;
  };

  return (
    <div enabled={isLoginModalOpen || isSignupModalOpen} className='modal-container'>
      <div className='modal-buttons-container'>
        <button id='login-button' className='modal-top-buttons'>
          Login
        </button>
        <button id='signup-button' className='modal-top-buttons'>
          Sign Up
        </button>
        <button onClick={closeModal} id='close-modal-button' className='modal-top-buttons'></button>
      </div>
      {renderForm()}
    </div>
  );
};

export default Modal;
