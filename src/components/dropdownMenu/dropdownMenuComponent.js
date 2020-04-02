import React, { useState } from 'react';
import './dropdownMenuComponent.css';

const Dropdownmenu = ({ resources, handleResourceChange, chosenResource }) => {
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState('false');

  const showDropdownMenu = (event) => {
    event.preventDefault();
    setDropdownMenuIsOpen(!dropdownMenuIsOpen);
  };

  return (
    <>
      <div className='dropdown-container'>
        <button className='dropdown-menu-button square-button' onClick={showDropdownMenu}>
          <i className='fa fa-caret-down'></i>
        </button>
        <p className='dropdown-input'>{chosenResource}</p>
      </div>
      {dropdownMenuIsOpen && (
        <div className='dropdown-content'>
          {resources.map((resource) => (
            <a
              key={resource._id}
              onClick={() => {
                handleResourceChange(resource);
              }}
            >
              {resource.name.en}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdownmenu;
