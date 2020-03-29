/* import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl, Popup, Marker } from 'react-leaflet';
import './mapComponent.css';
import LeafletControlButton from '../button/buttonComponent';

const LeafletMap = () => {
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);

  useEffect(() => {
    console.log('component re-rendered');
    confirmationPopupToggle();
  }, chosenLocation);

  const getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setMapPosition([position.coords.latitude, position.coords.longitude]);
        setChosenLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  const confirmationPopupToggle = () => {
    const chosenLocationMarker = document.getElementsByClassName('leaflet-marker-icon')[0];

    if (chosenLocationMarker === undefined) {
      console.log('no location chosen');
    } else {
      if (document.getElementsByClassName('leaflet-popup-content-wrapper').length === 0) {
        chosenLocationMarker.click();
      } else {
        console.log('popup is already open');
      }
    }
  };

  const getLatLngOnClick = (event) => {
    console.log(event.latlng.lat, event.latlng.lng);
    setChosenLocation([event.latlng.lat, event.latlng.lng]);
    setMapPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleLocationConfirmation = () => {
    console.log('chosen location confirmed');
    const saveLocation = chosenLocation;
    console.log(saveLocation);
    setChosenLocation([null, null]);
  };

  const handleLocationCancellation = () => {
    setChosenLocation([null, null]);
  };

  const renderLeafletPopup = () => {
    return chosenLocation == null ? null : (
      <Marker position={[chosenLocation[0], chosenLocation[1]]}>
        <Popup autoPan={false} closeButton={false} closeOnClick={false}>
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
            <button className='confirm-modal-button' onClick={handleLocationCancellation}>
              Cancel
            </button>
          </div>
        </Popup>
      </Marker>
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
        {renderLeafletPopup()}
      </Map>
    </>
  );
};

export default LeafletMap;
 */
