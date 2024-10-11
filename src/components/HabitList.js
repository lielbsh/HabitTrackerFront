import React, {useEffect} from 'react';
import { useUserData } from '../context/userContext'; 
import HabitItem from './HabitItem'; // Import your HabitItem component
import { deleteHabit, completeHabit } from '../api/habitScript';
import  { filterHabitsByFrequency, isHabitCompleted, updateHabitCompletion } from '../utils/habitHelpers'

const HabitList = () => {
    const { user, setUser, habits, setHabits } = useUserData();
    
   // Use effect to filter habits based on user's habits
    useEffect(() => {
        console.log('rerander')
        if (user && user.habits) {
            setHabits(filterHabitsByFrequency(user.habits));
        }
        }, [user, setHabits]); // Dependency array includes user and setHabits
        console.log('habits:',habits)

    // Check if user or habits data is available
    if (!user.habits) {
        return (
            <div className="mt-8">
                <p className="text-gray-500 text-center">Loading...</p>
            </div>
        );
    }

    // Function to handle deleting a habit
    const handleDelete = async (habitId) => {
        try {
            const updatedHabits = await deleteHabit(habitId, user._id);
            if (updatedHabits) {
                setUser({ ...user, habits: updatedHabits });
            }
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    // Function to handle completing a habit
    const handleComplete = async (habitToCheck) => {
    try {
        // Update the habit localy and check for streaks
        setHabits((prevHabits) => updateHabitCompletion(prevHabits, habitToCheck));
        console.log('Habit completion and streak updated:', new Date());

        // completeHabit(habitToCheck);


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
