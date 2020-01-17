import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import mockMarkers from '../../utils/mockNatureResourceMarker';

const NatureResourceMarkers = () => {
  const markers = mockMarkers.map(mockMarker => {
    return (
      <Marker key={mockMarker.id} position={[mockMarker.location.lat, mockMarker.location.long]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  });

  return <div>{markers}</div>;
};

export default NatureResourceMarkers;
