import React from 'react';
import './dropdownMenuComponent.css';

const Dropdownmenu = ({
  dropdownMenuIsOpen,
  handleDropdownMenuToggle,
  handleResourceChange,
  resources,
  chosenResource,
}) => {
  const renderResourcesButtons = () => {
    return dropdownMenuIsOpen && resources
      ? resources.map((resource) => (
          <button
            className='resource-button'
            key={resource.id}
            onClick={() => {
              handleResourceChange(resource);
            }}
          >
            {resource.name.en}
          </button>
        ))
      : null;
  };

  return (
    <>
      <div className='dropdown-container'>
        <button className='dropdown-menu-button square-button' onClick={handleDropdownMenuToggle}>
          <i className='fa fa-caret-down'></i>
        </button>
        <p className='resource-name'>{chosenResource.name}</p>
      </div>
      <div className='dropdown-content'>{renderResourcesButtons()}</div>
    </>
  );
};

export default Dropdownmenu;
