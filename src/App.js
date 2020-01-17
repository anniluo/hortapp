import React from 'react';
import './App.css';
import LeafletMap from './components/map/mapComponent';

const AddNatureResourceButton = () => {
  return <button id="add-button">Add Resource</button>;
};

const UsersLocationButton = () => {
  /*TODO: 
  1. ask permission to get location of the device
  2. get user's location and recentering the map*/
  return <button id="location-button">Location</button>;
};

function App() {
  return (
    <div className="App">
      <LeafletMap></LeafletMap>
    </div>
  );
}

export default App;
