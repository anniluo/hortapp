import React from 'react';
import { Marker } from 'react-leaflet';
import NatureResourcePopup from '../natureResourcePopup/natureResourcePopup';

const NatureResourceMarker = ({ marker }) => {
  return (
    <Marker
      interactive={true}
      key={marker.id}
      position={[marker.latLng.latitude, marker.latLng.longitude]}
    >
      <NatureResourcePopup resourceMarker={marker} />
    </Marker>
  );
};

export default NatureResourceMarker;
