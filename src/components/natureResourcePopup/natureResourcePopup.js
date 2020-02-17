import React from 'react';
import { Popup } from 'react-leaflet';
import mockResources from '../../utils/mockNatureResource';
import './natureResourcePopup.css';
import fruitsAndVegetableIcon from '../../assets/fruits-and-vegetables.png';

const NatureResourcePopup = ({ mockMarker }) => {
  return (
    <Popup>
      <img className='resource-icon' src={fruitsAndVegetableIcon} alt='Icon for berries' />
      <h5 id='nature-resource-name'>{mockMarker.natureResourceName} </h5>
      <div className='popup-info-container'>
        <p>Category: {mockResources[1].natureResourceCategory}</p>
        <p>
          Coordinates: [{mockMarker.location.lat},{mockMarker.location.long}]
        </p>
      </div>
    </Popup>
  );
};

export default NatureResourcePopup;
