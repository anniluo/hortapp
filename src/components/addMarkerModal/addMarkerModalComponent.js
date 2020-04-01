import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './addMarkerModalComponent.css';
import '../modal/modalComponent.css';
import Dropdownmenu from '../dropdownMenu/dropdownMenuComponent';

// TODO:
// 1. get chosen resource from dropdownmenu component
// 2. get user from token
// 3. get latitude and longtitude from map component

const AddResourceModal = ({ hideModalOnClick }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [resources, setResources] = useState([
    'Mustikka',
    'Puolukka',
    'Metsämansikka',
    'Nokkonen',
    'Voikukka',
  ]);
  const [locationName, setLocationName] = useState('');
  const [comment, setComment] = useState('');

  const handleAddMarker = (event) => {
    event.preventDefault();
    console.log('creating a new marker with', locationName, comment);
  };

  const renderErrorMessage = () => {
    return errorMessage !== null ? (
      <div className='modal-error-container'>
        <p className='error-message-text'>{errorMessage}</p>
      </div>
    ) : null;
  };

  return ReactDOM.createPortal(
    <div className='modal-container'>
      <div className='modal-header-container'>
        <h5>Add a New Marker</h5>
        <button id='close-modal-button' onClick={hideModalOnClick}></button>
      </div>
      {renderErrorMessage()}
      <form id='marker-form' className='modal-form'>
        <input
          className='form-input'
          type='text'
          placeholder='location'
          value={locationName}
          onChange={({ target }) => setLocationName(target.value)}
        />
        <Dropdownmenu resources={resources} />
        <label htmlFor='resource-comment' hidden>
          Comment:
        </label>
        <textarea
          id='resource-comment'
          placeholder='write a comment...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></textarea>
      </form>
      <input
        onClick={handleAddMarker}
        className='modal-form-submit'
        type='submit'
        value='Confirm'
      />
    </div>,
    document.getElementById('modal-root')
  );
};

export default AddResourceModal;
