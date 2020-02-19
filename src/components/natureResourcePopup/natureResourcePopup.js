import React from 'react';
import { Popup } from 'react-leaflet';
import mockResources from '../../utils/mockNatureResource';
import './natureResourcePopup.css';
import fruitsAndVegetableIcon from '../../assets/fruits-and-vegetables.png';

const NatureResourcePopup = ({ mockMarker }) => {
  return (
    <Popup className='popup-container'>
      <div className='popup-header-container'>
        <img className='resource-icon' src={fruitsAndVegetableIcon} alt='Icon for berries' />
        <h5 id='nature-resource-name'>{mockMarker.natureResourceName} </h5>
        <p id='date-user-info-text'>
          Added by <b>Username</b> on <b>19/02/2020</b>
        </p>
      </div>
      <div className='popup-info-container'>
        <p id='address-text'>
          <b>Address</b> (lat: 60.192059, long:24.945831)
        </p>
        <p id='user-comment-text'>Comment from the user</p>
        <a id='wikipedia-link' href='#'>
          Link to Wikipedia
        </a>
      </div>
    </Popup>
  );
};

export default NatureResourcePopup;
