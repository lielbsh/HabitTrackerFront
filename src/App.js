import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage'; 
import Signup from './screens/Register';
import Login from './screens/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
