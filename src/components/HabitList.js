import React from 'react';
import { useUserData } from '../context/userContext'; 

const HabitList = () => {
    const { user } = useUserData(); // Get the user from the context

    if (!user || !user.habits || user.habits.length === 0) {
        return <p>No habits found.</p>;
    }

    return (
        <ul>
            {user.habits.map((habit) => (
                <li key={habit._id}>{habit.name}</li> // Adjust according to your habit object structure
            ))}
        </ul>
    );
};

export default HabitList;
