import React from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import mockMarkers from '../../utils/mockNatureResourceMarker';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';

const LeafletMap = () => {
  const mapPosition = [60.192059, 24.945831];

  const renderNatureResourceMarkers = () =>
    mockMarkers.map(mockMarker => (
      <NatureResourceMarker mockMarker={mockMarker}></NatureResourceMarker>
    ));

  return (
    <>
      <Map center={mapPosition} zoom={13} zoomControl={false}>
        <ZoomControl position="topright"></ZoomControl>
        <LeafletControlButton
          buttonPosition="bottomright"
          toolTipText="Get your Location"
          buttonId="location-button"
        ></LeafletControlButton>
        <LeafletControlButton
          buttonPosition="bottomright"
          toolTipText="Add a New Nature Resource"
          buttonId="add-button"
        ></LeafletControlButton>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="marker-container">{renderNatureResourceMarkers()}</div>;
      </Map>
    </>
  );
};

export default LeafletMap;
