import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl, Circle, Popup } from 'react-leaflet';
import mockMarkers from '../../utils/mockNatureResourceMarker';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';
import HortappMenu from '../menu/menuComponent';

const LeafletMap = () => {
  /* states */
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [circlePosition, setCirclePosition] = useState(null);

  useEffect(
    () => {
      console.log('component re-rendered');
    },
    circlePosition,
    mapPosition
  );

  /* event handlers */
  const onMenuButtonClick = () => {
    setMenuIsOpen(!menuIsOpen);
    console.log();
  };

  const onLocationButtonClick = () => {
    getLocation();
  };

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

  const onAddResourceButtonClick = () => {
    console.log('open the add new nature resource modal');
  };

  const renderLeafletCircle = () => {
    return circlePosition == null ? null : (
      <Circle center={mapPosition} radius={250} fillColor='blue'>
        <Popup>You are here</Popup>
      </Circle>
    );
  };

  /* rendering */
  const renderNatureResourceMarkers = () =>
    mockMarkers.map(mockMarker => (
      <NatureResourceMarker key={mockMarker.id} mockMarker={mockMarker}></NatureResourceMarker>
    ));

  return (
    <>
      <Map id='hortapp-map' center={mapPosition} zoom={13} zoomControl={false}>
        <ZoomControl position='topright'></ZoomControl>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Get your Location'
          buttonId='location-button'
          buttonOnClick={onLocationButtonClick}
        ></LeafletControlButton>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Add a New Nature Resource'
          buttonId='add-button'
          buttonOnClick={onAddResourceButtonClick}
        ></LeafletControlButton>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <div className='marker-container'>{renderNatureResourceMarkers()}</div>
        <HortappMenu
          onMenuButtonClick={onMenuButtonClick}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
        ></HortappMenu>
        {renderLeafletCircle()}
      </Map>
    </>
  );
};

export default LeafletMap;
