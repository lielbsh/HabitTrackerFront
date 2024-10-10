import React from 'react';

const HabitItem = ({ habit, color, handleDelete, handleComplete }) => {
    return ( 
        <li 
            className={`relative rounded-lg shadow-md p-4 flex justify-between items-center ${color}`} 
            key ={ habit._id}
        >
            {/* Habit Title */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-dark">{habit.name}</h3>
                <p className="text-grayCustom">{habit.description}</p>
                <p className="text-gray-400 mt-2">Frequency: {habit.frequency}</p>
            </div>
            
            {/* Check Button */}
            <button
                onClick={() => handleComplete(habit._id)}
                className="mr-2 bg-teal-50 hover:bg-pink text-gray-400 rounded-full p-2 transition-colors duration-200"
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
    );
}

export default HabitItem;
