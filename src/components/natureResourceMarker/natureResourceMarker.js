import React from 'react';
import { Marker } from 'react-leaflet';
import NatureResourcePopup from '../natureResourcePopup/natureResourcePopup';

const NatureResourceMarker = ({ mockMarker }) => {
  return (
    <Marker
      key={mockMarker.id}
      position={[mockMarker.latLng.latitude, mockMarker.latLng.longitude]}
    >
      <NatureResourcePopup mockMarker={mockMarker} />
    </Marker>
  );
};

export default NatureResourceMarker;
