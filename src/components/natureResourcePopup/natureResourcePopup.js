import React from 'react';
import { Popup } from 'react-leaflet';
import './natureResourcePopup.css';

const NatureResourcePopup = ({ resourceMarker }) => {
  const reformatDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <Popup className='popup-container'>
      <div className='popup-header-container'>
        <img
          className='resource-icon'
          src={resourceMarker.natureResource.iconUrl}
          alt='Icon for resource'
        />
        <h5 id='nature-resource-name'>{resourceMarker.natureResource.name.en} </h5>
        <p id='harvest-info'>
          From: <b>{resourceMarker.natureResource.harvestSeason.start}</b>
          <br></br>
          To: <b>{resourceMarker.natureResource.harvestSeason.end}</b>
        </p>
      </div>
      <div className='popup-info-container'>
        <h5 id='address-text'>
          <b>{resourceMarker.locationName}</b>
        </h5>
        <p id='date-user-info-text'>
          Added by <b>{resourceMarker.addedByUser.username}</b> on:{' '}
          <b>{reformatDate(resourceMarker.date)}</b>
        </p>
        {resourceMarker.comment && <p id='user-comment-text'>{resourceMarker.comment}</p>}
      </div>
    </Popup>
  );
};

export default NatureResourcePopup;
