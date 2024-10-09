import React from 'react';
import { useUserData } from '../context/userContext'; 
import { deleteHabit } from '../scripts/habitScript';

const HabitList = () => {
    const { user, setUser } = useUserData();

    if (!user || !user.habits || user.habits.length === 0) {
        return (
            <div className="mt-8">
                <p className="text-gray-500 text-center">No habits found.</p>
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

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">
                Your Habits
            </h2>
            <ul className="space-y-4">
                {user.habits.map((habit) => (
                    <li key={habit._id} className="relative bg-purple-100 rounded-lg shadow-md p-4 flex justify-between items-center">
                        {/* Habit Title */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-purple-800">{habit.name}</h3>
                            <p className="text-grayCustom">{habit.description}</p>
                            <p className="text-mustard mt-2">Frequency: {habit.frequency}</p>
                        </div>
                        
                        {/* Check Button */}
                        <button
                            className="mr-2 bg-greenPrimary hover:bg-pink text-stone-100 rounded-full p-2 transition-colors duration-200"
                            aria-label="Mark as complete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(habit._id)}
                            className="bg-inherit hover:bg-red-400 text-white rounded-full p-1 transition-colors duration-200"
                            aria-label={`Delete habit ${habit.name}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default HabitList;
