import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, ZoomControl, Circle, Popup, Marker } from 'react-leaflet';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';
import HortappMenu from '../menu/menuComponent';
import './mapComponent.css';
import ModalToggle from '../modal/modalToggleComponent';
import AddMarkerModal from '../addMarkerModal/addMarkerModalComponent';
import resourceMarkerService from '../../services/resourceMarkers';
import userService from '../../services/users';

// TODO:
// 1. after successfully adding a new marker exit add marker mode
// and center the map on the added marker
// 2. on signup success functionality
// 3. login success functionality

const LeafletMap = () => {
  const mapRef = useRef();
  const markerRef = useRef();

  const [user, setUser] = useState(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [addMarkerModeIsOn, setAddMarkerModeIsOn] = useState(false);
  const [resourceMarkers, setResourceMarkers] = useState([]);

  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [circlePosition, setCirclePosition] = useState(null);
  const [chosenLocation, setChosenLocation] = useState({ lat: null, long: null });

  useEffect(() => {
    console.log('first effect');
    getResourceMarkers();
  }, []);

  useEffect(() => {
    console.log('second effect');
    const loggedInUser = userService.getFromLocalStorage('loggedHortappUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      handleUserChange(user);
      resourceMarkerService.setToken(user.token);
    }
  }, []);

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
      console.log('Error occured while trying to fetch markers');
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
        console.log(position);
        setMapPosition([position.coords.latitude, position.coords.longitude]);
        setCirclePosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  const onMenuButtonClick = () => {
    closeLastOpenedPopup();
    setMenuIsOpen(!menuIsOpen);
  };

  const enterAddMarkerMode = () => {
    toggleMarkerPointerEvents();
    setAddMarkerModeIsOn(true);
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
      console.log(event.latlng.lat, event.latlng.lng);
      setChosenLocation({ lat: event.latlng.lat, long: event.latlng.lng });
      setMapPosition([event.latlng.lat, event.latlng.lng]);
      confirmationPopupToggle();
    }
  };

  const exitAddMarkerMode = () => {
    emptyChosenLocation();
    toggleMarkerPointerEvents();
    setAddMarkerModeIsOn(false);
  };

  const emptyChosenLocation = () => {
    setChosenLocation({ lat: null, long: null });
  };

  /* renders */
  const renderHortappMenu = () => {
    return !addMarkerModeIsOn ? (
      <HortappMenu
        onMenuButtonClick={onMenuButtonClick}
        menuIsOpen={menuIsOpen}
        user={user}
        handleUserChange={handleUserChange}
      ></HortappMenu>
    ) : null;
  };

  const renderNatureResourceMarkers = () => {
    if (resourceMarkers) {
      return resourceMarkers.map((resourceMarker) => (
        <NatureResourceMarker
          key={resourceMarker.id}
          marker={resourceMarker}
        ></NatureResourceMarker>
      ));
    } else {
      return null;
    }
  };

  const renderLeafletCircle = () => {
    return circlePosition === null ? null : (
      <Circle center={circlePosition} radius={250} fillColor='blue'></Circle>
    );
  };

  const renderLeafletPopup = () => {
    return chosenLocation.lat === null ? null : (
      <Marker ref={markerRef} position={[chosenLocation.lat, chosenLocation.long]}>
        <Popup autoPan={false} closeButton={false} closeOnClick={false}>
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
              buttonOnClick={enterAddMarkerMode}
            ></LeafletControlButton>
          ) : null
        ) : (
          <LeafletControlButton
            buttonPosition='bottomright'
            toolTipText='Cancel and go back to map view'
            buttonId='cancel-round-button'
            buttonOnClick={exitAddMarkerMode}
          ></LeafletControlButton>
        )}
      </>
    );
  };

  return (
    <>
      <div id='modal-background' className='hidden-modal-background'></div>
      <Map
        id='hortapp-map'
        center={mapPosition}
        zoom={13}
        zoomControl={false}
        onClick={getLatLngOnClick}
        ref={mapRef}
        interactive={false}
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
        {renderLeafletCircle()}
      </Map>
    </>
  );
};

export default LeafletMap;
