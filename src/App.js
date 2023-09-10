import React from 'react';

import './App.css';
import { Vehicle } from './features/vehicle/Vehicle';

function App() {
  console.log(process.env)
  return (
    <div className="App">
        <Vehicle />
    </div>
  );
}

export default App;
