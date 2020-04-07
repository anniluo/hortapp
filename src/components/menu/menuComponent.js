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
  selectedFilterOptions,
  handleFilterOptionsChange,
}) => {
  const handleLogout = (event) => {
    event.preventDefault();
    userService.clearStorage('loggedHortappUser');
    handleUserChange(null);
  };

  const renderMapFilter = () => {
    return (
      <div className='filter-container'>
        <p>Filter Options</p>
        <div className='filter-options-container'>
          {user !== null ? (
            <>
              <input
                type='checkbox'
                name='my-markers'
                id='my-markers-filter'
                value='myMarkers'
                onChange={(event) => handleFilterOptionsChange(event.target.value)}
                checked={selectedFilterOptions.includes('myMarkers')}
              />
              <label htmlFor='my-markers'>My markers</label>
            </>
          ) : null}
          <input
            type='checkbox'
            name='berries'
            id='berries-filter'
            value='berries'
            onChange={(event) => handleFilterOptionsChange(event.target.value)}
            checked={selectedFilterOptions.includes('berries')}
          />
          <label htmlFor='berries'>Berries</label>
          <input
            type='checkbox'
            name='mushrooms'
            id='mushrooms-filter'
            value='mushrooms'
            onChange={(event) => handleFilterOptionsChange(event.target.value)}
            checked={selectedFilterOptions.includes('mushrooms')}
          />
          <label htmlFor='mushrooms'>Mushrooms</label>
          <input
            type='checkbox'
            name='greens'
            id='greens-filter'
            value='greens'
            onChange={(event) => handleFilterOptionsChange(event.target.value)}
            checked={selectedFilterOptions.includes('greens')}
          />
          <label htmlFor='greens'>Greens</label>
        </div>
      </div>
    );
  };

  return menuIsOpen ? (
    <div className='menu-container'>
      <div className='menu-header-container'>
        <h4 className='menu-header-text' onClick={onMenuButtonClick}>
          Hortapp
        </h4>
        <button onClick={onMenuButtonClick} className='menu-button menu-open-icon'></button>
        {user && (
          <p>
            Logged in as <b>{user.username}</b>
          </p>
        )}
      </div>

      <div className='menu-contents'>
        {renderMapFilter()}
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
