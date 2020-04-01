import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, ZoomControl, Circle, Popup, Marker } from 'react-leaflet';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';
import HortappMenu from '../menu/menuComponent';
import './mapComponent.css';
import mockResourceMarkers from '../../utils/mockResourceMarker';
import ModalToggle from '../modal/modalToggleComponent';
import AddMarkerModal from '../addMarkerModal/addMarkerModalComponent';

// TODO:
// 1. close open popups when menubutton is clicked
// 2. Disable interaction with existing markers when add marker-mode is on
// 3. Close confirmation popup when confirm-button is clicked

const LeafletMap = () => {
  const markerRef = useRef(null);
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circlePosition, setCirclePosition] = useState(null);
  const [resourceMarkers, setResourceMarkers] = useState([]);
  const [chosenLocation, setChosenLocation] = useState({ lat: null, long: null });
  const [confirmedLocation, setConfirmedLocation] = useState({ lat: null, long: null });
  const [isAddMarkerModeOn, setIsAddMarkerModeOn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('first effect');
    setResourceMarkers(mockResourceMarkers);
  }, []);

  const onMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
    // close possible opened popups
  };

  const enterAddMarkerMode = () => {
    console.log('entering add marker mode');
    setIsAddMarkerModeOn(true);
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

  const confirmationPopupToggle = () => {
    if (!isAddMarkerModeOn) {
      console.log('add marker mode is not on');
    } else {
      if (document.getElementsByClassName('leaflet-popup-content-wrapper').length === 0) {
        console.log('no popup open, opening popup');
        const marker = markerRef.current;
        if (marker != null) {
          marker.leafletElement.openPopup();
        }
      } else {
        console.log('popup is already open');
      }
    }
  };

  const getLatLngOnClick = (event) => {
    if (isAddMarkerModeOn) {
      console.log(event.latlng.lat, event.latlng.lng);
      setChosenLocation({ lat: event.latlng.lat, long: event.latlng.lng });
      setMapPosition([event.latlng.lat, event.latlng.lng]);
      confirmationPopupToggle();
    } else {
      console.log('add marker mode is not on');
    }
  };

  const handleSelectionModeCancel = () => {
    emptyChosenLocation();
    setIsAddMarkerModeOn(false);
  };

  const handleLocationConfirmation = () => {
    console.log('chosen location confirmed');
    setConfirmedLocation(chosenLocation);
    emptyChosenLocation();
  };

  const emptyChosenLocation = () => {
    setChosenLocation({ lat: null, long: null });
  };

  // renders
  const renderHortappMenu = () => {
    return !isAddMarkerModeOn ? (
      <HortappMenu
        onMenuButtonClick={onMenuButtonClick}
        menuIsOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
      ></HortappMenu>
    ) : null;
  };

  const renderNatureResourceMarkers = () => {
    if (resourceMarkers) {
      return resourceMarkers.map((resourceMarker) => (
        <NatureResourceMarker
          key={resourceMarker.id}
          mockMarker={resourceMarker}
        ></NatureResourceMarker>
      ));
    } else {
      return null;
    }
  };

  const renderLeafletCircle = () => {
    return circlePosition == null ? null : (
      <Circle center={mapPosition} radius={250} fillColor='blue'>
        <Popup>You are here</Popup>
      </Circle>
    );
  };

  const renderLeafletPopup = () => {
    return chosenLocation.lat == null ? null : (
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
              content={(hideModal) => (
                <AddMarkerModal hideModalOnClick={hideModal}></AddMarkerModal>
              )}
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
        {!isAddMarkerModeOn ? (
          isLoggedIn ? (
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
            buttonOnClick={handleSelectionModeCancel}
          ></LeafletControlButton>
        )}
      </>
    );
  };

  return (
    <>
      <Map
        id='hortapp-map'
        center={mapPosition}
        zoom={13}
        zoomControl={false}
        onClick={getLatLngOnClick}
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
