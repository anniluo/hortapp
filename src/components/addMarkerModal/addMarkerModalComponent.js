import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './addMarkerModalComponent.css';
import '../modal/modalComponent.css';
import Dropdownmenu from '../dropdownMenu/dropdownMenuComponent';
import natureResourcesService from '../../services/natureResources';

// TODO:
// 1. get chosen resource from dropdownmenu component
// 2. get user from token
// 3. get latitude and longtitude from map component

const AddResourceModal = ({ hideModalOnClick }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [resources, setResources] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getNatureResources();
  }, []);

  const getNatureResources = async () => {
    try {
      const natureResources = await natureResourcesService.getAll();
      const resourceNames = natureResources.map((resource) => {
        return resource.name.en;
      });
      setResources(resourceNames);
    } catch (error) {
      setErrorMessage('Error occured while trying to fetch resources');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
      <form id='marker-form' className='modal-form' onSubmit={handleAddMarker}>
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
      <input className='modal-form-submit' type='submit' value='Confirm' />
    </div>,
    document.getElementById('modal-root')
  );
};

export default AddResourceModal;
