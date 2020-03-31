import React from 'react';
import Control from 'react-leaflet-control';
import './menuComponent.css';
import ModalToggle from '../modal/modalToggleComponent';
import Modal from '../modal/modalComponent';

const HortappMenu = ({ menuIsOpen, onMenuButtonClick }) => {
  const renderMapFilter = () => {
    return (
      <div className='filter-container'>
        <p>Filter</p>
        <div className='filter-options-container'>
          <input type='radio' id='option1' value='Option 1' />
          <label htmlFor='option1'>Option 1</label>
          <input type='radio' id='option2' value='Option 2' />
          <label htmlFor='option2'>Option 2</label>
          <input type='radio' id='option2' value='Option 3' />
          <label htmlFor='option3'>Option 3</label>
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
      </div>
      <div className='menu-contents'>
        <ModalToggle
          toggle={(showModal) => (
            <button className='full-button square-button no-border' onClick={showModal}>
              Login
            </button>
          )}
          content={(hideModal) => (
            <Modal
              modalHeaderText='Login to Hortapp'
              hideModalOnClick={hideModal}
              formId='login-form'
            />
          )}
        />
        <ModalToggle
          toggle={(showModal) => (
            <button className='full-button square-button no-border' onClick={showModal}>
              Signup
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
