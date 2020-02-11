import React from 'react';
import './App.css';
import LeafletMap from './components/map/mapComponent';
import AddResourceModal from './components/addResourceModal/addResourceModalComponent';

function App() {
  return (
    <div className='App'>
      <AddResourceModal></AddResourceModal>
    </div>
  );
}

export default App;
