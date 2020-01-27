import React from 'react';
import { Popup } from 'react-leaflet';
import mockResources from '../../utils/mockNatureResource';

const NatureResourcePopup = ({ mockMarker }) => {
  return (
    <Popup>
      {mockMarker.natureResourceName} <br />[{mockMarker.location.lat},{mockMarker.location.long}]{' '}
      <br />
      {mockResources[1].natureResourceCategory}
    </Popup>
  );
};

export default NatureResourcePopup;
