import React, { useEffect } from 'react';
import './dropdownMenuComponent.css';

const Dropdownmenu = ({
  dropdownMenuIsOpen,
  handleDropdownMenuToggle,
  handleResourceChange,
  resources,
  chosenResource,
}) => {
  const renderResourcesAnchors = () => {
    return dropdownMenuIsOpen && resources
      ? resources.map((resource) => (
          <a
            key={resource.id}
            onClick={() => {
              handleResourceChange(resource.name.en);
            }}
          >
            {resource.name.en}
          </a>
        ))
      : null;
  };

  return (
    <>
      <div className='dropdown-container'>
        <button className='dropdown-menu-button square-button' onClick={handleDropdownMenuToggle}>
          <i className='fa fa-caret-down'></i>
        </button>
        <p className='dropdown-input'>{chosenResource}</p>
      </div>
      <div className='dropdown-content'>{renderResourcesAnchors()}</div>
    </>
  );
};

export default Dropdownmenu;
