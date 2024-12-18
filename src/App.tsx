import { useState } from 'react'
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Exercise } from './pages/Exercise';

const App = () => {
  return (
    <Router> 
      <Routes> 
      <Route path="/" element={<Home />} />  
      <Route path="/exercise" element={<Exercise />} />  
      </Routes>
    </Router>
  );
};

export default App
