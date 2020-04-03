import React from 'react';
import Control from 'react-leaflet-control';
import './menuComponent.css';
import ModalToggle from '../modal/modalToggleComponent';
import Modal from '../modal/modalComponent';
import userService from '../../services/users';

const HortappMenu = ({
  menuIsOpen,
  onMenuButtonClick,
  user,
  handleUserChange,
  toggleModalBackground,
}) => {
  const handleLogout = (event) => {
    event.preventDefault();
    userService.clearLocalStorage('loggedHortappUser');
    handleUserChange(null);
  };

  const renderMapFilter = () => {
    return (
      <div className='filter-container'>
        <p>Filter</p>
        <div className='filter-options-container'>
          <input type='radio' id='my-markers-filter' value='my-markers' />
          <label htmlFor='my-markers'>My markers</label>
          <input type='radio' id='berries-filter' value='berries' />
          <label htmlFor='berries'>Berries</label>
          <input type='radio' id='mushrooms-filter' value='mushrooms' />
          <label htmlFor='mushrooms'>Mushrooms</label>
          <input type='radio' id='greens-filter' value='greens' />
          <label htmlFor='greens'>Greens</label>
        </div>
      </div>
    );
  };

  return menuIsOpen ? (
    <div className='menu-container'>
      <div className='menu-header-container'>
        <h5 className='menu-header-text' onClick={onMenuButtonClick}>
          Menu
        </h5>
        <button onClick={onMenuButtonClick} className='menu-button menu-open-icon'></button>
        {user && (
          <p>
            Logged in as <b>{user.username}</b>
          </p>
        )}
      </div>
      <div className='menu-contents'>
        {user === null ? (
          <>
            <ModalToggle
              toggle={(showModal) => (
                <button className='full-button square-button no-border' onClick={showModal}>
                  Log in
                </button>
              )}
              content={(hideModal) => (
                <Modal
                  modalHeaderText='Login to Hortapp'
                  hideModalOnClick={hideModal}
                  formId='login-form'
                  user={user}
                  handleUserChange={handleUserChange}
                />
              )}
            />
            <ModalToggle
              toggle={(showModal) => (
                <button className='full-button square-button no-border' onClick={showModal}>
                  Sign up
                </button>
              )}
              content={(hideModal) => (
                <Modal
                  modalHeaderText='Signup to Hortapp'
                  hideModalOnClick={hideModal}
                  formId='signup-form'
                />
              )}
            />
          </>
        ) : (
          <button className='full-button square-button no-border' onClick={handleLogout}>
            Log out
          </button>
        )}
        {renderMapFilter()}
        <ModalToggle
          toggle={(showModal) => (
            <button className='full-button square-button no-border' onClick={showModal}>
              About
            </button>
          )}
          content={(hideModal) => (
            <Modal modalHeaderText='About Hortapp' hideModalOnClick={hideModal} formId='' />
          )}
        />
      </div>
    </div>
  ) : (
    <Control position='topleft'>
      <button onClick={onMenuButtonClick} className='menu-button menu-closed-icon'></button>
    </Control>
  );
};

export default HortappMenu;
