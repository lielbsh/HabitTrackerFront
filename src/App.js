import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage'; 
import Signup from './screens/Register';
import Login from './screens/Login';
import Analytics from './screens/Analytics';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/HabitTrackerFront/" element={<Login/>} />
        <Route path="/HabitTrackerFront/signup/" element={<Signup />} />
        <Route path="/HabitTrackerFront/home/" element={<HomePage />} />
        <Route path="/HabitTrackerFront/analytics/" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default App;
