import React, { useState, useEffect } from 'react';
import './dropdownMenuComponent.css';
import natureResourcesService from '../../services/natureResources';

const Dropdownmenu = ({
  dropdownMenuIsOpen,
  handleDropdownMenuToggle,
  handleResourceChange,
  chosenResource,
}) => {
  const [resources, setResources] = useState(['Mustikka', 'Mansikka', 'Omena']);

  useEffect(() => {
    //getNatureResources();
    handleResourceChange(resources[0]);
  }, []);

  const getNatureResources = async () => {
    try {
      const natureResources = await natureResourcesService.getAll();
      console.log('resources on modal:', natureResources);
      setResources(natureResources);
      handleResourceChange(natureResources[0]);
    } catch (error) {
      console.log('Error occured while trying to fetch resources');
    }
  };

  return (
    <>
      <div className='dropdown-container'>
        <button className='dropdown-menu-button square-button' onClick={handleDropdownMenuToggle}>
          <i className='fa fa-caret-down'></i>
        </button>
        <p className='dropdown-input'>{chosenResource}</p>
      </div>
      {dropdownMenuIsOpen && (
        <div className='dropdown-content'>
          {resources.map((resource) => (
            <a
              key={resource}
              onClick={() => {
                handleResourceChange(resource);
              }}
            >
              {resource}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdownmenu;
