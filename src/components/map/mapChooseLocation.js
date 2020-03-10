import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl, Circle, Popup } from 'react-leaflet';
import './mapComponent.css';
import LeafletControlButton from '../button/buttonComponent';
import ModalToggle from '../modal/modalToggleComponent';
import Modal from '../modal/modalComponent';

const LeafletMap = () => {
  /* states */
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [chosenLocation, setChosenLocation] = useState([null, null]);
  const [circlePosition, setCirclePosition] = useState(null);

  useEffect(() => {
    console.log('component re-rendered');
  }, chosenLocation);

  const getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMapPosition([position.coords.latitude, position.coords.longitude]);
        setCirclePosition([position.coords.latitude, position.coords.longitude]);
      },
      error => {
        console.log(error.message);
      }
    );
  };

  const handleLocationConfirmation = () => {
    console.log('location confirmed');
  };

  const getLatLngOnClick = event => {
    console.log(event.latlng.lat, event.latlng.lat);
    setChosenLocation([event.latlng.lat, event.latlng.lat]);
  };

  const renderConfirmationModal = () => {
    return chosenLocation[0] == null ? null : (
      <Modal>
        <div className='modal-header-container'>
          <h5 id='confirm-modal-header-text'>Confirm chosen location</h5>
        </div>
        <div className='modal-text-container'>
          <p>Do you want to confirm this location:</p>
          <p>
            latitute: <b>{chosenLocation[0]}</b> <br></br>
            longitude: <b>{chosenLocation[1]}</b>?
          </p>
        </div>
        <div className='modal-buttons-container'>
          <button className='confirm-modal-button' onClick={handleLocationConfirmation}>
            Confirm
          </button>
          <button className='confirm-modal-button' onClick={handleLocationConfirmation}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  };

  const renderLeafletCircle = () => {
    return circlePosition == null ? null : (
      <Circle center={mapPosition} radius={250} fillColor='blue'>
        <Popup>You are here</Popup>
      </Circle>
    );
  };

  return (
    <>
      <div className='header-container'>
        <h4 id='choose-location-header-text'>Choose a Location</h4>
      </div>
      <Map
        id='hortapp-map'
        center={mapPosition}
        zoom={13}
        zoomControl={false}
        onClick={getLatLngOnClick}
      >
        <ZoomControl position='topright'></ZoomControl>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Get your Location'
          buttonId='location-round-button'
          buttonOnClick={getDeviceLocation}
        ></LeafletControlButton>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Cancel and go back to map view'
          buttonId='cancel-round-button'
          buttonOnClick={() => console.log('cancel-button pressed')}
        ></LeafletControlButton>
        {renderLeafletCircle()}
        {renderConfirmationModal()}
      </Map>
    </>
  );
};

export default LeafletMap;
