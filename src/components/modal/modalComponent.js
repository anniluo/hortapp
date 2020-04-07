import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import loginService from '../../services/login';
import signupService from '../../services/signup';
import resourceMarkerService from '../../services/resourceMarkers';
import userService from '../../services/users';
import './modalComponent.css';

const Modal = ({ modalHeaderText, hideModalOnClick, formId, handleUserChange }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
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

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Username and Password are required');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (username.length < 4 || password.length < 8) {
      setErrorMessage(
        'username must be at least 4 characters long and password must be at least 8 characters long'
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      const user = await loginService.login({ username, password });
      userService.setToLocalStorage('loggedHortappUser', user);
      resourceMarkerService.setToken(user.token);
      setUsername('');
      setPassword('');
      hideModalOnClick();
      handleUserChange(user);
    } catch (error) {
      setErrorMessage('Incorrect username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (email === '' || username === '' || password === '') {
      setErrorMessage('Email, username and password are required');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (username.length < 4 || password.length < 8) {
      setErrorMessage(
        'Username must be at least 4 characters long and password must be at least 8 characters long'
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage('Your password and confirmation password do not match.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      await signupService.signup({
        email: email,
        username: username,
        password: password,
      });

      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setSuccessMessage('Account created succesfully!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);
    } catch (error) {
      setErrorMessage('Error occured while trying to create a user');
      console.log(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const renderErrorMessage = () => {
    return errorMessage !== null ? (
      <div className='modal-error-container'>
        <p className='error-message-text'>{errorMessage}</p>
      </div>
    ) : null;
  };

  const renderSuccessMessage = () => {
    return successMessage !== null ? (
      <div className='modal-success-container'>
        <p className='success-message-text'>{successMessage}</p>
      </div>
    ) : null;
  };

  return ReactDOM.createPortal(
    <>
      <div className='modal-container'>
        <div className='modal-header-container'>
          <h5>{modalHeaderText}</h5>
          <button className='close-modal-button no-border' onClick={hideModalOnClick}></button>
        </div>
        {formId !== '' ? (
          <>
            {renderSuccessMessage()}
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
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
