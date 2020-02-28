import React, { useState } from 'react';
import './dropdownMenuComponent.css';

const Dropdownmenu = ({ resources }) => {
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [chosenResource, setChosenResource] = useState(resources[0], 'Mustikka');

  const showDropdownMenu = event => {
    event.preventDefault();
    setDropdownMenuIsOpen(true);
  };

  return (
    <div className='dropdown-container'>
      <button className='dropdown-menu-button square-button' onClick={showDropdownMenu}>
        <i className='fa fa-caret-down'></i>
      </button>
      <input
        className='dropdown-input'
        value={chosenResource}
        type='text'
        placeholder='resource'
        disabled
      />
      {dropdownMenuIsOpen && (
        <div className='dropdown-content'>
          {resources.map(resource => (
            <a key={resource} onClick={() => setChosenResource(resource)}>
              {resource}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdownmenu;
