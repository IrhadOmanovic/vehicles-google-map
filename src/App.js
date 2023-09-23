import React from 'react';

import './App.css';
import { Vehicle } from './features/vehicle/Vehicle';
import { Route, Routes } from 'react-router-dom';
import VehiclePage from './features/vehicle/VehiclePage';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/vehicle/:id" element={<VehiclePage /> } exact /> 
        <Route path="/" element={<Vehicle /> } exact/> 
      </Routes> 
    </div>
  );
}

export default App;
