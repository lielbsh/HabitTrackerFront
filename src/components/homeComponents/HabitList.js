import React, {useEffect, useState} from 'react';
import { useUserData } from '../../context/userContext'; 
import HabitItem from './HabitItem'; 
import { deleteHabit, updateHabit } from '../../api/habitScript';
import  { filterHabitsByFrequency, isHabitCompleted, sortHabitsByCompletion, updateHabitCompletion } from '../../utils/habitHelpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const HabitList = () => {
    const { user, setUser } = useUserData();
    const [habits, setHabits] = useState({
        daily: [],
        weekly: [],
        monthly: [],
    });
    const today = new Date();

   // Use effect to filter habits based on user's habits
    useEffect(() => {
        if (user && user.habits) {
            setHabits(filterHabitsByFrequency(user.habits)); // Sort habits by frequency
            sortHabitsByCompletion(setHabits); // Moves completed habits to the end
        }
        }, [user, setUser ,setHabits]); // Dependency array includes user and setHabits
        console.log('habits:',habits)

    // Check if user or habits data is available
    if (!user) {
        return (
            <div className="mt-8">
                <p className="text-gray-500 text-center">Loading...</p>
            </div>
        );
    }

    // Function to calculate progress 
    const calculateProgress = (habitList) => {
        const completed = habitList.filter((habit) => isHabitCompleted(habit, today)).length;
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
        // Updated habit
        let updated = updateHabitCompletion(habitToCheck)
        console.log(updated)

        // Updates the user in the local storage
        setUser((prevUser) => ({
            ...prevUser,
            habits: prevUser.habits.map(habit =>
            habit._id === habitToCheck._id ? updated : habit 
            )
        }));
        console.log('user updeted with the completed habit');

        // sends req to the server
        updateHabit(updated); 
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 container mx-auto px-12 py-8">
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
                                isCompleted={isHabitCompleted(habit, today)}
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
                                isCompleted={isHabitCompleted(habit, today)}
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
                                    pathColor: `#98fbfd`,
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
                                isCompleted={isHabitCompleted(habit, today)}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* No Habits Found */}
            {habits.daily.length === 0 && habits.weekly.length === 0 && habits.monthly.length === 0 && (
            <div className="col-span-3 mt-8 flex flex-col items-center justify-center">
                
                <div className="mb-4">
                <svg className="w-16 h-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 4h.01M9 16h.01M9 8h6m-7 12h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                </div>

                {/* Message */}
                <p className="text-gray-500 text-lg font-semibold text-center mb-2">Your habit list is empty</p>
                <p className="text-gray-500 text-center mb-4">Start creating new habits!</p>
            </div>
            )}

        </div>
    );
};

export default HabitList;
