import React from 'react';
import './modalComponent.css';

const Modal = () => {
  return (
    <div className="modal-container">
      <div className="modal-buttons-container">
        <button id="login-button">Login</button>
        <button id="signup-button">Sign Up</button>
      </div>
      <form className="modal-form">
        <input className="modal-form-input" type="text" placeholder="username"></input>
        <input className="modal-form-input" type="email" placeholder="e-mail"></input>
        <input className="modal-form-input" type="text" placeholder="password"></input>
        <input className="modal-form-input" type="submit" value="submit"></input>
      </form>
    </div>
  );
};

export default Modal;
