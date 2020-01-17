import React from 'react';
import { Popup } from 'react-leaflet';

const NatureResourcePopup = ({ mockMarker }) => {
  return <Popup>{mockMarker.natureResourceName}</Popup>;
};

export default NatureResourcePopup;
