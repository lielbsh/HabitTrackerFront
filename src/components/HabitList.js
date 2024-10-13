import React, {useEffect, useState} from 'react';
import { useUserData } from '../context/userContext'; 
import HabitItem from './HabitItem'; // Import your HabitItem component
import { deleteHabit, updateHabit } from '../api/habitScript';
import  { filterHabitsByFrequency, isHabitCompleted, sortHabitsByCompletion, updateHabitCompletion } from '../utils/habitHelpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const HabitList = () => {
    const { user, setUser } = useUserData();
    const [habits, setHabits] = useState({
        daily: [],
        weekly: [],
        monthly: [],
    });

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

    const calculateProgress = (habitList) => {
        const completed = habitList.filter(isHabitCompleted).length;
        const total = habitList.length;
        return total === 0 ? 0 : (completed / total) * 100;
    };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4 py-8">
            {/* Daily Habits Column */}
            {habits.daily.length > 0 && (
                <div className="p-6 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2">Daily Habits</h3>
                        <div className="w-12 h-12">
                            <CircularProgressbar
                                value={calculateProgress(habits.daily)}
                                text={`${Math.round(calculateProgress(habits.daily))}%`}
                                styles={buildStyles({
                                    pathColor: `#c7f98e`,  
                                    textColor: '#545454',  
                                })}
                            />
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {habits.daily.map((habit) => (
                            <HabitItem 
                                key={habit._id}
                                handleDelete={handleDelete}
                                habit={habit}
                                color="bg-background-lightGreen"
                                handleComplete={handleComplete}
                                isCompleted={isHabitCompleted(habit)}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* Weekly Habits Column */}
            {habits.weekly.length > 0 && (
                <div className="p-6 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2">Weekly Habits</h3>
                        <div className="w-12 h-12">
                            <CircularProgressbar
                                value={calculateProgress(habits.weekly)}
                                text={`${Math.round(calculateProgress(habits.weekly))}%`}
                                styles={buildStyles({
                                    pathColor: `#ffbaba`, 
                                    textColor: '#545454', 
                                })}
                            />
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {habits.weekly.map((habit) => (
                            <HabitItem 
                                key={habit._id}
                                handleDelete={handleDelete}
                                habit={habit}
                                color="bg-background-lightPink"
                                handleComplete={handleComplete}
                                isCompleted={isHabitCompleted(habit)}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* Monthly Habits Column */}
            {habits.monthly.length > 0 && (
                <div className="p-6 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2">Monthly Habits</h3>
                        <div className="w-12 h-12">
                            <CircularProgressbar
                                value={calculateProgress(habits.monthly)}
                                text={`${Math.round(calculateProgress(habits.monthly))}%`}
                                styles={buildStyles({
                                    pathColor: `#bffeff`,
                                    textColor: '#545454',
                                })}
                            />
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {habits.monthly.map((habit) => (
                            <HabitItem 
                                key={habit._id}
                                handleDelete={handleDelete}
                                habit={habit}
                                color="bg-background-babyBlue"
                                handleComplete={handleComplete}
                                isCompleted={isHabitCompleted(habit)}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* No Habits Found */}
            {habits.daily.length === 0 && habits.weekly.length === 0 && habits.monthly.length === 0 && (
                <div className="col-span-3 mt-8">
                    <p className="text-gray-500 text-center">No habits found.</p>
                </div>
            )}
        </div>
    );
};

export default HabitList;
