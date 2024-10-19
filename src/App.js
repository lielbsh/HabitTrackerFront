import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage'; 
import Signup from './screens/Signup';
import Login from './screens/Login';
import Analytics from './screens/Analytics';

const App = () => {
  return (
    <Router basename="/HabitTrackerFront">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default App;
