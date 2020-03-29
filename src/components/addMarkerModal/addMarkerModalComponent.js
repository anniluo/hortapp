import React, { useState } from 'react';
import './addMarkerModalComponent.css';
import Dropdownmenu from '../dropdownMenu/dropdownMenuComponent';

const AddResourceModal = ({ hideModalOnClick }) => {
  const [resources, setResources] = useState([
    'Mustikka',
    'Puolukka',
    'Metsämansikka',
    'Nokkonen',
    'Voikukka',
  ]);

  return (
    <>
      <div className='resource-modal-header'>
        <h5>Add a new Resource</h5>
        <button id='close-modal-button' onClick={hideModalOnClick}></button>
      </div>
      <div className='modal-error-container'>
        <p>Error message will be dispayled here</p>
      </div>
      <form className='resource-modal-form'>
        <input type='text' placeholder='location'></input>
        <Dropdownmenu resources={resources} />
        <label htmlFor='resource-comment' hidden>
          Comment:
        </label>
        <textarea id='resource-comment' placeholder='write a comment...'></textarea>
      </form>
      <button className='a-button modal-form-submit' onClick={hideModalOnClick}>
        Confirm
      </button>
    </>
  );
};

export default AddResourceModal;
