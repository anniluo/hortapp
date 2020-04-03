import React from 'react';
import { Popup } from 'react-leaflet';
import './natureResourcePopup.css';

const NatureResourcePopup = ({ resourceMarker }) => {
  return (
    <Popup className='popup-container'>
      <div className='popup-header-container'>
        <img
          className='resource-icon'
          src={resourceMarker.natureResource.iconUrl}
          alt='Icon for resource'
        />
        <h5 id='nature-resource-name'>{resourceMarker.natureResource.name.en} </h5>
        {/*harvest season */}
        <p id='date-user-info-text'>
          Added by <b>{resourceMarker.addedByUser.username}</b> on <b>{resourceMarker.date}</b>
        </p>
      </div>
      <div className='popup-info-container'>
        <p id='address-text'>
          <b>{resourceMarker.locationName}</b>
          <br></br>
          {resourceMarker.latLng.latitude}, {resourceMarker.latLng.longitude}
        </p>
        <p id='user-comment-text'>{resourceMarker.comment}</p>
      </div>
    </Popup>
  );
};

export default NatureResourcePopup;
