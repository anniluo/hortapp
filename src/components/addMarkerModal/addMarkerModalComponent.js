import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './addMarkerModalComponent.css';
import '../modal/modalComponent.css';
import Dropdownmenu from '../dropdownMenu/dropdownMenuComponent';
import natureResourceService from '../../services/natureResources';
import resourceMarkerService from '../../services/resourceMarkers';

const AddResourceModal = ({
  hideModalOnClick,
  chosenLocation,
  user,
  updateMarkers,
  handleAddMarkerModeChange,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [natureResources, setNatureResources] = useState(null);
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [comment, setComment] = useState('');
  const [chosenResource, setChosenResource] = useState({ name: '', id: '' });

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

  const handleResourceChange = (resource) => {
    setChosenResource({ name: resource.name.en, id: resource.id });
    setDropdownMenuIsOpen(false);
  };

  const handleDropdownMenuToggle = (event) => {
    event.preventDefault();
    setDropdownMenuIsOpen(!dropdownMenuIsOpen);
  };

  const handleAddMarker = async (event) => {
    event.preventDefault();

    if (locationName === '' || chosenResource.id === '') {
      setErrorMessage('Missing address and/or resource');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (locationName.length < 6) {
      setErrorMessage('Address must be at least 6 characters long');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (comment.length <= 10 && comment.length > 0) {
      setErrorMessage('Comment must be at least 10 characters long');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      await resourceMarkerService.create({
        latLng: { latitude: chosenLocation.lat, longitude: chosenLocation.long },
        locationName: locationName,
        date: Date.now(),
        userId: user.id,
        comment: comment,
        natureResource: chosenResource.id,
      });

      setLocationName('');
      handleResourceChange(natureResources[0]);
      setComment('');
      updateMarkers();
      hideModalOnClick();
      handleAddMarkerModeChange();
    } catch (error) {
      setErrorMessage('an error occured when trying to create a new marker', error);
      console.log(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
          placeholder='address'
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
          placeholder='write a comment (optional)'
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
