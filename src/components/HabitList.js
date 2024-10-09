import React from 'react';
import { useUserData } from '../context/userContext'; 

const HabitList = () => {
    const { user } = useUserData(); // Get the user from the context

    if (!user || !user.habits || user.habits.length === 0) {
        return <p>No habits found.</p>;
    } else {
        console.log('all user habits:' ,user.habits)
    }

    return (
        <ul>
            {user.habits.map((habit) => (
                <li key={habit._id}>
                <h3>{habit.name}</h3>
                <p>{habit.description}</p>
                <p>Frequency: {habit.frequency}</p>
                {/* <p>Streak: {habit.streak}</p> */}
              </li>
            ))}
        </ul>
    );
};

export default HabitList;
