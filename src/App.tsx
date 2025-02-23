import { useState } from 'react'
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Exercise } from './pages/Exercise';
import ProgressPage from "./pages/ProgressPage";

const App = () => {
  return (
    <Router> 
      <Routes> 
      <Route path="/" element={<Home />} />  
      <Route path="/exercise" element={<Exercise />} /> 
      <Route path="/progress" element={<ProgressPage />} />  
      </Routes>
    </Router>
  );
};

export default App
