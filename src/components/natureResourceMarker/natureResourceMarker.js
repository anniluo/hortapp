import React from 'react';
import { Marker } from 'react-leaflet';
import NatureResourcePopup from '../natureResourcePopup/natureResourcePopup';
import mockMarkers from '../../utils/mockNatureResourceMarker';

const NatureResourceMarkers = () => {
  const markers = mockMarkers.map(mockMarker => {
    return (
      <Marker key={mockMarker.id} position={[mockMarker.location.lat, mockMarker.location.long]}>
        <NatureResourcePopup mockMarker={mockMarker} />
      </Marker>
    );
  });

  return <div>{markers}</div>;
};

export default NatureResourceMarkers;
