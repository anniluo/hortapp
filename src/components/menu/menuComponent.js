import React, { useState } from 'react';
import Control from 'react-leaflet-control';
import './menuComponent.css';

const HortappMenu = ({ isMenuOpen, onMenuButtonClick }) => {
  const MapFilter = () => {
    return (
      <div className='filter-container'>
        <p>Filter</p>
        <div className='filter-options-container'>
          <input type='radio' id='option1' value='Option 1' />
          <label for='option1'>Option 1</label>
          <input type='radio' id='option2' value='Option 2' />
          <label for='option2'>Option 2</label>
          <input type='radio' id='option2' value='Option 3' />
          <label for='option3'>Option 3</label>
        </div>
      </div>
    );
  };

  return isMenuOpen ? (
    <div className='menu-container'>
      <div className='menu-header-container'>
        <p>Menu</p>
        <button onClick={onMenuButtonClick} id='menu-open-button' className='menu-button'></button>
      </div>
      <div className='menu-contents'>
        <a href='#'>Login</a>
        <a href='#'>Signup</a>
        <MapFilter></MapFilter>
        <a href='#'>About</a>
      </div>
    </div>
  ) : (
    <Control position='topleft'>
      <button onClick={onMenuButtonClick} id='menu-closed-button' className='menu-button'></button>
    </Control>
  );
};

export default HortappMenu;
