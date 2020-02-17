import React from 'react';
import Control from 'react-leaflet-control';
import './menuComponent.css';
import ModalToggle from '../modal/modalToggleComponent';
import Modal from '../modal/modalComponent';

const HortappMenu = ({ menuIsOpen, onMenuButtonClick }) => {
  /* rendering */
  const renderMapFilter = () => {
    return (
      <div className='filter-container'>
        <p>Filter</p>
        <div className='filter-options-container'>
          <input type='radio' id='option1' value='Option 1' />
          <label for='option1'>Option 1</label>
          <input type='radio' id='option2' value='Option 2' />
          <label for='option2'>Option 2</label>
          <input type='radio' id='option2' value='Option 3' />
          <label for='option3'>Option 3</label>
        </div>
      </div>
    );
  };

  return menuIsOpen ? (
    <>
      <div className='menu-container'>
        <div className='menu-header-container'>
          <h5>Menu</h5>
          <button
            onClick={onMenuButtonClick}
            id='menu-open-button'
            className='menu-button'
          ></button>
        </div>
        <div className='menu-contents'>
          <ModalToggle
            toggle={showModal => <button onClick={showModal}>Login</button>}
            content={hideModal => (
              <Modal>
                <button id='login-button' className='modal-top-buttons'>
                  Login
                </button>
                <button id='signup-button' className='modal-top-buttons'>
                  Sign Up
                </button>
                <button
                  id='close-modal-button'
                  className='modal-top-buttons'
                  onClick={hideModal}
                ></button>
                <form id='login -form' className='modal-form'>
                  <input className='modal-form-input' type='text' placeholder='username'></input>
                  <input className='modal-form-input' type='text' placeholder='password'></input>
                  <input
                    onClick={hideModal}
                    className='modal-form-input round-button'
                    type='submit'
                    value='Confirm'
                  ></input>
                </form>
              </Modal>
            )}
          />
          <ModalToggle
            toggle={showModal => <button onClick={showModal}>Signup</button>}
            content={hideModal => (
              <Modal>
                <button id='login-button' className='modal-top-buttons'>
                  Login
                </button>
                <button id='signup-button' className='modal-top-buttons'>
                  Sign Up
                </button>
                <button
                  id='close-modal-button'
                  className='modal-top-buttons'
                  onClick={hideModal}
                ></button>
                <form id='singup-form' className='modal-form'>
                  <input className='modal-form-input' type='email' placeholder='e-mail'></input>
                  <input className='modal-form-input' type='text' placeholder='username'></input>
                  <input className='modal-form-input' type='text' placeholder='password'></input>
                  <input
                    className='modal-form-input'
                    type='text'
                    placeholder='confirm password'
                  ></input>
                  <input
                    onClick={hideModal}
                    className='modal-form-input round-button'
                    type='submit'
                    value='Confirm'
                  ></input>
                </form>
              </Modal>
            )}
          />
          {renderMapFilter()}
          <ModalToggle
            toggle={showModal => <button onClick={showModal}>About</button>}
            content={hideModal => (
              <Modal>
                <p>Here I'll write a small description of the app</p>
                <button
                  id='close-modal-button'
                  className='modal-top-buttons'
                  onClick={hideModal}
                ></button>
              </Modal>
            )}
          />
        </div>
      </div>
    </>
  ) : (
    <Control position='topleft'>
      <button onClick={onMenuButtonClick} id='menu-closed-button' className='menu-button'></button>
    </Control>
  );
};

export default HortappMenu;
