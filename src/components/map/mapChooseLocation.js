import React, { useState } from 'react';
import { Map, TileLayer, ZoomControl, Circle, Popup } from 'react-leaflet';
import './mapComponent.css';
import LeafletControlButton from '../button/buttonComponent';

const LeafletMap = () => {
  /* states */
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [chosenLocation, setChosenLocation] = useState([60.192059, 24.945831]);
  const [circlePosition, setCirclePosition] = useState(null);

  const getLocation = () => {
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
      <Map id='hortapp-map' center={mapPosition} zoom={13} zoomControl={false}>
        <ZoomControl position='topright'></ZoomControl>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {renderLeafletCircle()}
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Get your Location'
          buttonId='location-round-button'
          buttonOnClick={getLocation}
        ></LeafletControlButton>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Cancel and go back to map view'
          buttonId='cancel-round-button'
          buttonOnClick={() => console.log('cancel-button pressed')}
        ></LeafletControlButton>
      </Map>
    </>
  );
};

export default LeafletMap;
