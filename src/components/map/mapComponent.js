import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import mockMarkers from '../../utils/mockNatureResourceMarker';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';

const LeafletMap = () => {
  const mapPosition = [60.192059, 24.945831];

  const renderNatureResourceMarkers = () =>
    mockMarkers.map(mockMarker => (
      <NatureResourceMarker mockMarker={mockMarker}></NatureResourceMarker>
    ));

  return (
    <>
      <Map center={mapPosition} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="marker-container">{renderNatureResourceMarkers()}</div>
      </Map>
    </>
  );
};

export default LeafletMap;
