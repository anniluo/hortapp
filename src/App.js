import React from 'react';
import './App.css';
import LeafletMap from './components/map/mapComponent';
import ChooseLocationMap from './components/map/mapChooseLocation';

const App = () => {
  return (
    <div className='App'>
      <ChooseLocationMap></ChooseLocationMap>
    </div>
  );
};

export default App;
