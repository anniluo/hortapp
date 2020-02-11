import React from 'react';
import './addResourceModalComponent.css';

const DropDownmenu = () => {
  let chosenResource = 'Mustikka';
  return (
    <div className='dropdown-container'>
      <button className='dropdown-button'>
        <i class='fa fa-caret-down'></i>
      </button>
      <input
        className='dropdown-input'
        value={chosenResource}
        type='text'
        placeholder='resource'
        disabled
      />
      <div className='dropdown-content'>
        <a href='#'>Mustikka</a>
        <a href='#'>Puolukka</a>
        <a href='#'>Metsämansikka</a>
        <a href='#'>Nokkonen</a>
        <a href='#'>Voikukka</a>
      </div>
    </div>
  );
};

const AddResourceModal = () => {
  return (
    <div className='resource-modal-container'>
      <div className='resource-modal-header'>
        <h5>Add a new Resource</h5>
        <button id='close-modal-button'></button>
      </div>
      <form className='resource-modal-form'>
        <input type='text' placeholder='location'></input>
        <DropDownmenu></DropDownmenu>
        <label for='resource-comment' hidden>
          Comment:
        </label>
        <textarea id='resource-comment' placeholder='write a comment...'></textarea>
      </form>
      <button className='round-button'>Confirm</button>
    </div>
  );
};

export default AddResourceModal;
