import React from 'react';
import './modalComponent.css';

//needs a state to determine which is chosen (signup or login)

const Modal = () => {
  const signupForm = () => {
    return (
      <form id="singup-form" className="modal-form">
        <input className="modal-form-input" type="email" placeholder="e-mail"></input>
        <input className="modal-form-input" type="text" placeholder="username"></input>
        <input className="modal-form-input" type="text" placeholder="password"></input>
        <input className="modal-form-input" type="text" placeholder="confirm password"></input>
        <input className="modal-form-input round-button" type="submit" value="Confirm"></input>
      </form>
    );
  };

  const loginForm = () => {
    return (
      <form id="login -form" className="modal-form">
        <input className="modal-form-input" type="text" placeholder="username"></input>
        <input className="modal-form-input" type="text" placeholder="password"></input>
        <input className="modal-form-input round-button" type="submit" value="Confirm"></input>
      </form>
    );
  };

  return (
    <div className="modal-container">
      <div className="modal-buttons-container">
        <button id="login-button" className="modal-top-buttons">
          Login
        </button>
        <button id="signup-button" className="modal-top-buttons">
          Sign Up
        </button>
        <button id="close-modal-button" className="modal-top-buttons"></button>
      </div>
      {loginForm()}
    </div>
  );
};

export default Modal;
