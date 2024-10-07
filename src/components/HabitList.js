import React from 'react';
import { useData } from '../context/DataContext';

const HabitList = () => {
  const { habits } = useData();
  // console.log('habits', habits)
  return (
    <div>
      <h2>Habit List</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
