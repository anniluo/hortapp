import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, ZoomControl, Popup, Marker } from 'react-leaflet';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';
import HortappMenu from '../menu/menuComponent';
import './mapComponent.css';
import ModalToggle from '../modal/modalToggleComponent';
import AddMarkerModal from '../addMarkerModal/addMarkerModalComponent';
import resourceMarkerService from '../../services/resourceMarkers';
import userService from '../../services/users';
import { handleError } from '../../utils/errorHandler';

const LeafletMap = () => {
  const mapRef = useRef();
  const markerRef = useRef();

  const [user, setUser] = useState(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [addMarkerModeIsOn, setAddMarkerModeIsOn] = useState(false);
  const [resourceMarkers, setResourceMarkers] = useState([]);

  const [mapMaxBounds] = useState([
    [59.44507, 19.08325],
    [70.0988, 31.62826],
  ]);
  const [mapZoom, setMapZoom] = useState('6');
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [chosenLocation, setChosenLocation] = useState({ lat: null, long: null });
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([
    'berries',
    'mushrooms',
    'greens',
  ]);

  useEffect(() => {
    getResourceMarkers();
  }, []);

  useEffect(() => {
    const loggedInUser = userService.getFromStorage('loggedHortappUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      handleUserChange(user);
      resourceMarkerService.setToken(user.token);
    }
  }, []);

  const handleFilterOptionsChange = (newFilter) => {
    if (selectedFilterOptions.includes(newFilter)) {
      const updatedOptions = selectedFilterOptions.filter((option) => option !== newFilter);
      setSelectedFilterOptions(updatedOptions);
    } else {
      setSelectedFilterOptions(selectedFilterOptions.concat(newFilter));
    }
  };

  const handleUserChange = (user) => {
    setUser(user);
  };

  const closeLastOpenedPopup = () => {
    const map = mapRef.current;
    if (map != null) {
      map.leafletElement.closePopup();
    }
  };

  const getResourceMarkers = async () => {
    try {
      const markers = await resourceMarkerService.getAll();
      setResourceMarkers(markers);
    } catch (error) {
      alert(handleError(error));
      return;
    }
  };

  const toggleMarkerPointerEvents = () => {
    const map = mapRef.current;
    if (map != null) {
      const markers = document.getElementsByClassName('leaflet-marker-icon');
      for (let i = 0; markers.length > i; i++) {
        addMarkerModeIsOn
          ? (markers[i].style.pointerEvents = 'auto')
          : (markers[i].style.pointerEvents = 'none');
      }
    }
  };

  const getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapPosition([position.coords.latitude, position.coords.longitude]);
        const currentZoom = getCurrentZoomLevel();
        currentZoom < 13 ? setMapZoom(13) : setMapZoom(currentZoom);
      },
      (error) => {
        alert(handleError(error));
      }
    );
  };

  const onMenuButtonClick = () => {
    closeLastOpenedPopup();
    setMenuIsOpen(!menuIsOpen);
  };

  const handleAddMarkerModeChange = () => {
    if (addMarkerModeIsOn) {
      emptyChosenLocation();
      toggleMarkerPointerEvents();
      setAddMarkerModeIsOn(false);
    } else {
      toggleMarkerPointerEvents();
      setAddMarkerModeIsOn(true);
    }
  };

  const confirmationPopupToggle = () => {
    if (addMarkerModeIsOn) {
      if (document.getElementsByClassName('leaflet-popup-content-wrapper').length === 0) {
        const marker = markerRef.current;
        if (marker != null) {
          marker.leafletElement.openPopup();
        }
      }
    }
  };

  const getLatLngOnClick = (event) => {
    if (addMarkerModeIsOn) {
      setChosenLocation({ lat: event.latlng.lat, long: event.latlng.lng });
      confirmationPopupToggle();
    }
  };

  const getCurrentZoomLevel = () => {
    const map = mapRef.current;
    if (map !== null) {
      return map.leafletElement.getZoom();
    } else {
      return mapZoom;
    }
  };

  const emptyChosenLocation = () => {
    setChosenLocation({ lat: null, long: null });
  };

  const renderHortappMenu = () => {
    return !addMarkerModeIsOn ? (
      <HortappMenu
        onMenuButtonClick={onMenuButtonClick}
        menuIsOpen={menuIsOpen}
        user={user}
        handleUserChange={handleUserChange}
        selectedFilterOptions={selectedFilterOptions}
        handleFilterOptionsChange={handleFilterOptionsChange}
      ></HortappMenu>
    ) : null;
  };

  const renderNatureResourceMarkers = () => {
    if (resourceMarkers) {
      return resourceMarkers.map((marker) => (
        <NatureResourceMarker
          key={marker.id}
          marker={marker}
          selectedFilterOptions={selectedFilterOptions}
          userId={user ? user.id : null}
        ></NatureResourceMarker>
      ));
    } else {
      return null;
    }
  };

  const renderLeafletPopup = () => {
    return chosenLocation.lat === null ? null : (
      <Marker ref={markerRef} position={[chosenLocation.lat, chosenLocation.long]}>
        <Popup closeButton={false} closeOnClick={false}>
          <div className='modal-header-container'>
            <h5 id='confirm-modal-header-text'>Confirm chosen location</h5>
          </div>
          <div className='modal-text-container'>
            <p>Do you want to confirm this location:</p>
            <p>
              latitute: <b>{chosenLocation.lat}</b> <br></br>
              longitude: <b>{chosenLocation.long}</b>?
            </p>
          </div>
          <div className='modal-buttons-container'>
            <ModalToggle
              toggle={(showModal) => (
                <button className='confirm-modal-button' onClick={showModal}>
                  Confirm
                </button>
              )}
              content={(hideModal) => {
                closeLastOpenedPopup();
                return (
                  <AddMarkerModal
                    hideModalOnClick={hideModal}
                    chosenLocation={chosenLocation}
                    user={user}
                    updateMarkers={getResourceMarkers}
                    handleAddMarkerModeChange={handleAddMarkerModeChange}
                  ></AddMarkerModal>
                );
              }}
            ></ModalToggle>
            <button className='confirm-modal-button' onClick={emptyChosenLocation}>
              Cancel
            </button>
          </div>
        </Popup>
      </Marker>
    );
  };

  const renderLeafletControlButtons = () => {
    return (
      <>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Get your Location'
          buttonId='location-round-button'
          buttonOnClick={getDeviceLocation}
        ></LeafletControlButton>
        {!addMarkerModeIsOn ? (
          user !== null ? (
            <LeafletControlButton
              buttonPosition='bottomright'
              toolTipText='Add a New Marker'
              buttonId='add-round-button'
              buttonOnClick={handleAddMarkerModeChange}
            ></LeafletControlButton>
          ) : null
        ) : (
          <LeafletControlButton
            buttonPosition='bottomright'
            toolTipText='Cancel and go back to map view'
            buttonId='cancel-round-button'
            buttonOnClick={handleAddMarkerModeChange}
          ></LeafletControlButton>
        )}
      </>
    );
  };

  return (
    <>
      {addMarkerModeIsOn && (
        <div id='add-mode-container'>
          <p>Choose a Location</p>
        </div>
      )}
      <div id='modal-root'></div>
      <div id='modal-background' className='hidden-modal-background'></div>
      <Map
        id='leaflet-map'
        maxBounds={mapMaxBounds}
        center={mapPosition}
        zoom={mapZoom}
        minZoom={6}
        maxZoom={15}
        zoomControl={false}
        onClick={getLatLngOnClick}
        ref={mapRef}
      >
        <ZoomControl position='topright'></ZoomControl>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {renderLeafletControlButtons()}
        {renderNatureResourceMarkers()}
        {renderHortappMenu()}
        {renderLeafletPopup()}
      </Map>
    </>
  );
};

export default LeafletMap;
