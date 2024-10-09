import React from 'react';
import { useUserData } from '../context/userContext'; 
import { deleteHabit } from '../scripts/habitScript';

const HabitList = () => {
    const { user, setUser } = useUserData(); // Get the user from the context
    console.log(user.habits.map(habit => habit._id));

    if (!user || !user.habits || user.habits.length === 0) {return <p>No habits found.</p>};

    // Function to handle deleting a habit
    const handleDelete = async (habitId) => {
        try {
            // Call the delete function from userScript
            const updatedHabits = await deleteHabit(habitId, user._id);
            if (updatedHabits) {
                setUser({ ...user, habits: updatedHabits })
            }
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    return (
        <ul>
            {user.habits.map((habit) => (
                <li key={habit._id}>
                    <h3>{habit.name}</h3>
                    <p>{habit.description}</p>
                    <p>Frequency: {habit.frequency}</p>
                    {/* <p>Streak: {habit.streak}</p> */}
                    <button onClick={() => handleDelete(habit._id)}>Delete</button>
              </li>
            ))}
        </ul>
    );
};

export default HabitList;
