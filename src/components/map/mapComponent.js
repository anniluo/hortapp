import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import NatureResourceMarkers from '../natureResourceMarker/natureResourceMarker';

const LeafletMap = () => {
  const mapPosition = [60.192059, 24.945831];
  return (
    <>
      <Map center={mapPosition} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NatureResourceMarkers />
      </Map>
    </>
  );
};

export default LeafletMap;
