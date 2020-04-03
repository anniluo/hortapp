import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './addMarkerModalComponent.css';
import '../modal/modalComponent.css';
import Dropdownmenu from '../dropdownMenu/dropdownMenuComponent';
import natureResourceService from '../../services/natureResources';

const AddResourceModal = ({ hideModalOnClick, chosenLocation, user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [natureResources, setNatureResources] = useState(null);
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [comment, setComment] = useState('');
  const [chosenResource, setChosenResource] = useState('');

  useEffect(() => {
    getNatureResources();
  }, []);

  const getNatureResources = async () => {
    try {
      const resources = await natureResourceService.getAll();
      setNatureResources(resources);
    } catch (error) {
      setErrorMessage('Error occured while trying to fetch resources');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleResourceChange = (resourceName) => {
    setChosenResource(resourceName);
    setDropdownMenuIsOpen(false);
  };

  const handleDropdownMenuToggle = (event) => {
    event.preventDefault();
    setDropdownMenuIsOpen(!dropdownMenuIsOpen);
  };

  const handleAddMarker = (event) => {
    event.preventDefault();
    console.log(
      'creating a new marker with',
      locationName,
      comment,
      chosenLocation,
      user.username,
      chosenResource
    );
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
      <form id='marker-form' className='modal-form' onSubmit={handleAddMarker}>
        <input
          className='form-input'
          type='text'
          placeholder='location'
          value={locationName}
          onChange={({ target }) => setLocationName(target.value)}
        />
        <Dropdownmenu
          dropdownMenuIsOpen={dropdownMenuIsOpen}
          handleResourceChange={handleResourceChange}
          handleDropdownMenuToggle={handleDropdownMenuToggle}
          resources={natureResources}
          chosenResource={chosenResource}
        />
        <label htmlFor='resource-comment' hidden>
          Comment:
        </label>
        <textarea
          id='resource-comment'
          placeholder='write a comment...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></textarea>
        <input className='modal-form-submit' type='submit' value='Confirm' />
      </form>
    </div>,
    document.getElementById('modal-root')
  );
};

export default AddResourceModal;
