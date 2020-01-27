import React from 'react';
import Control from 'react-leaflet-control';

const leafletControlButton = ({ buttonPosition, buttonText }) => {
  return (
    <Control position={buttonPosition}>
      <button>{buttonText}</button>
    </Control>
  );
};

export default leafletControlButton;
