import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import FullEvent from './containers/FullEvent/FullEvent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/full_event/:id" element={<FullEvent />} />
    </Routes>
  );
}

export default App;
