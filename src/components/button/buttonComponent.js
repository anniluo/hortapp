import React from 'react';
import Control from 'react-leaflet-control';
import './buttonComponent.css';

const leafletControlButton = ({ buttonPosition, toolTipText, buttonId, buttonOnClick }) => {
  return (
    <Control position={buttonPosition}>
      <button onClick={buttonOnClick} className='round-button tooltip' id={buttonId}>
        <span className='tooltiptext'> {toolTipText}</span>
      </button>
    </Control>
  );
};

export default leafletControlButton;
