import React from 'react';
import Control from 'react-leaflet-control';
import './buttonComponent.css';

const leafletControlButton = ({ buttonPosition, toolTipText, buttonId }) => {
  return (
    <Control position={buttonPosition}>
      <button className='round-button tooltip' id={buttonId}>
        <span class='tooltiptext'> {toolTipText}</span>
      </button>
    </Control>
  );
};

export default leafletControlButton;
