import React from 'react';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <HabitList/>
      <AddHabitForm/>
    </div>
  );
};

export default HomePage;