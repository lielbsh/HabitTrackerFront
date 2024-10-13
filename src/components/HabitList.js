import React, {useEffect} from 'react';
import { useUserData } from '../context/userContext'; 
import HabitItem from './HabitItem'; // Import your HabitItem component
import { deleteHabit, updateHabit } from '../api/habitScript';
import  { filterHabitsByFrequency, isHabitCompleted, sortHabitsByCompletion, updateHabitCompletion } from '../utils/habitHelpers'

const HabitList = () => {
    const { user, setUser, habits, setHabits } = useUserData();
    
   // Use effect to filter habits based on user's habits
    useEffect(() => {
        if (user && user.habits) {
            setHabits(filterHabitsByFrequency(user.habits)); // Sort habits by frequency
            sortHabitsByCompletion(setHabits); // Moves completed habits to the end
        }
        }, [user, setHabits]); // Dependency array includes user and setHabits
        console.log('habits:',habits)

    // Check if user or habits data is available
    if (!user) {
        return (
            <div className="mt-8">
                <p className="text-gray-500 text-center">Loading...</p>
            </div>
        );
    }

    // Function to handle deleting a habit
    const handleDelete = async (habitId) => {
        const updatedHabits = user.habits.filter(habit => habit._id !== habitId);
        setUser({ ...user, habits: updatedHabits });
        setHabits(filterHabitsByFrequency(user.habits));

         try {
        // Make the server request to delete the habit
        await deleteHabit(habitId, user._id);

        } catch (error) {
            console.error('Error deleting habit:', error);
            setUser({ ...user, habits: originalHabits }); // Revert to original habits
        }
};

    // Function to handle completing a habit
    const handleComplete = async (habitToCheck) => {
    try {
        // Update the habit and check for streaks
        setHabits((prevHabits) => updateHabitCompletion(prevHabits, habitToCheck)); // this sends the req to the server
        console.log('Habit completion and streak updated');


    } catch (error) {
        console.error('Error:', error);
    }
    };

    // Function to handle editing a habit
    const handleUpdate = async (updatedHabit) => {
        try {
            // Update the habit locally
            setUser((prevUser) => {
                // Find the index of the habit to update
                const updatedHabits = prevUser.habits.map((habit) =>
                    habit._id === updatedHabit._id ? { ...habit, ...updatedHabit } : habit
                );
    
                return { ...prevUser, habits: updatedHabits };
            });

            // Sends req to the server
            console.log(user.habits)
            console.log(updatedHabit)
            updateHabit(updatedHabit);

        } catch (error) {
            console.error('Error:', error);
        }
        };


    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">
                Your Habits
            </h2>

            {habits.daily.length > 0 && (
                <>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-3">Daily</h3>
                        <ul className="space-y-4">
                            {habits.daily.map((habit) => (
                                <HabitItem 
                                    key={habit._id}
                                    handleDelete = {handleDelete}
                                    habit = {habit}
                                    color={'bg-background-lightGreen'}
                                    handleComplete={handleComplete}
                                    isCompleted = {isHabitCompleted(habit)}
                                    handleUpdate={handleUpdate}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {habits.weekly.length > 0 && (
                <>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-3">Weekly</h3>
                        <ul className="space-y-4">
                            {habits.weekly.map((habit) => (
                                <HabitItem
                                key={habit._id} 
                                    handleDelete = {() => handleDelete(habit._id)}
                                    habit={habit}
                                    color={'bg-background-lightPink'}
                                    handleComplete={handleComplete}
                                    isCompleted = {isHabitCompleted(habit)}
                                    handleUpdate={handleUpdate}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {habits.monthly.length > 0 && (
                <>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-3">Monthly</h3>
                        <ul className="space-y-4">
                            {habits.monthly.map((habit) => (
                                <HabitItem 
                                    key={habit._id}
                                    handleDelete = {() => handleDelete(habit._id)}
                                    habit={habit}
                                    color={'bg-background-babyBlue'}
                                    handleComplete={handleComplete}
                                    isCompleted = {isHabitCompleted(habit)}
                                    handleUpdate={handleUpdate}
                                />
                            ))} 
                        </ul>
                    </div>
                </>
            )}

            {habits.daily.length === 0 && habits.weekly.length === 0 && habits.monthly.length === 0 && (
                <div className="mt-8">
                    <p className="text-gray-500 text-center">No habits found.</p>
                </div>
            )}
        </section>
    );
};

export default HabitList;
