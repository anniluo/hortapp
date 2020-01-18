import React from 'react';
import { Marker } from 'react-leaflet';
import NatureResourcePopup from '../natureResourcePopup/natureResourcePopup';

const NatureResourceMarker = ({ mockMarker }) => {
  return (
    <Marker key={mockMarker.id} position={[mockMarker.location.lat, mockMarker.location.long]}>
      <NatureResourcePopup mockMarker={mockMarker} />
    </Marker>
  );
};

export default NatureResourceMarker;
