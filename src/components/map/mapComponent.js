import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import mockMarkers from '../../utils/mockNatureResourceMarker';
import NatureResourceMarker from '../natureResourceMarker/natureResourceMarker';
import LeafletControlButton from '../button/buttonComponent';
import HortappMenu from '../menu/menuComponent';
import Modal from '../modal/modalComponent';

const LeafletMap = () => {
  /* states */
  const [mapPosition, setMapPosition] = useState([60.192059, 24.945831]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    console.log('component updated');
  }, [isMenuOpen]);

  const onMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /* rendering */
  const renderModal = () => {
    return isLoginModalOpen || isSignupModalOpen ? (
      <Modal
        isLoginModalOpen={isLoginModalOpen}
        isSignupModalOpen={isSignupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignupModalOpen={setIsSignupModalOpen}
      ></Modal>
    ) : null;
  };

  const renderNatureResourceMarkers = () =>
    mockMarkers.map(mockMarker => (
      <NatureResourceMarker mockMarker={mockMarker}></NatureResourceMarker>
    ));

  return (
    <>
      <Map center={mapPosition} zoom={13} zoomControl={false}>
        <ZoomControl position='topright'></ZoomControl>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Get your Location'
          buttonId='location-button'
        ></LeafletControlButton>
        <LeafletControlButton
          buttonPosition='bottomright'
          toolTipText='Add a New Nature Resource'
          buttonId='add-button'
        ></LeafletControlButton>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <div className='marker-container'>{renderNatureResourceMarkers()}</div>
        <HortappMenu
          onMenuButtonClick={onMenuButtonClick}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          isSignupModalOpen={isSignupModalOpen}
          setIsSignupModalOpen={setIsSignupModalOpen}
        ></HortappMenu>
        {renderModal()}
      </Map>
    </>
  );
};

export default LeafletMap;
