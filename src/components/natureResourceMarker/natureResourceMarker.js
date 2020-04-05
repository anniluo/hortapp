import React from 'react';
import { Marker } from 'react-leaflet';
import NatureResourcePopup from '../natureResourcePopup/natureResourcePopup';

const NatureResourceMarker = ({ marker, selectedFilterOptions }) => {
  const renderMarker = () => {
    if (selectedFilterOptions.includes(marker.natureResource.category.toLowerCase())) {
      return (
        <Marker key={marker.id} position={[marker.latLng.latitude, marker.latLng.longitude]}>
          <NatureResourcePopup resourceMarker={marker} />
        </Marker>
      );
    }
  };

  return <>{renderMarker()}</>;
};

export default NatureResourceMarker;
