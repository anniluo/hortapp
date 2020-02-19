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
          <button onClick={onMenuButtonClick} className='menu-button menu-open-icon'></button>
        </div>
        <div className='menu-contents'>
          <ModalToggle
            toggle={showModal => (
              <button className='full-button square-button no-border' onClick={showModal}>
                Login
              </button>
            )}
            content={hideModal => (
              <Modal>
                <div className='modal-header-container'>
                  <h5>Login to Hortapp</h5>
                  <button className='close-modal-button no-border' onClick={hideModal}></button>
                </div>
                <form id='login-form' className='modal-form'>
                  <input className='modal-form-input' type='text' placeholder='username'></input>
                  <input className='modal-form-input' type='text' placeholder='password'></input>
                  <input
                    onClick={hideModal}
                    className='modal-form-submit'
                    type='submit'
                    value='Confirm'
                  ></input>
                </form>
              </Modal>
            )}
          />
          <ModalToggle
            toggle={showModal => (
              <button className='full-button square-button no-border' onClick={showModal}>
                Signup
              </button>
            )}
            content={hideModal => (
              <Modal>
                <div className='modal-header-container'>
                  <h5>Signup to Hortapp</h5>
                  <button className='close-modal-button no-border' onClick={hideModal}></button>
                </div>
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
                    className='modal-form-submit'
                    type='submit'
                    value='Confirm'
                  ></input>
                </form>
              </Modal>
            )}
          />
          {renderMapFilter()}
          <ModalToggle
            toggle={showModal => (
              <button className='full-button square-button no-border' onClick={showModal}>
                About
              </button>
            )}
            content={hideModal => (
              <Modal>
                <div className='modal-header-container'>
                  <h5>About Hortapp</h5>
                  <button className='close-modal-button no-border' onClick={hideModal}></button>
                </div>
                <div className='about-text-container'>
                  Here I'll write a small description of the app
                </div>
              </Modal>
            )}
          />
        </div>
      </div>
    </>
  ) : (
    <Control position='topleft'>
      <button onClick={onMenuButtonClick} className='menu-button menu-closed-icon'></button>
    </Control>
  );
};

export default HortappMenu;
