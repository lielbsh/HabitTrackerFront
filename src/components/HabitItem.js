import React, {useState} from 'react';

const HabitItem = ({ habit, color, handleDelete, handleComplete, isCompleted }) => {
    const [showGif, setShowGif] = useState(false);

    const handleCompleteClick = (habit) => {
        handleComplete(habit);
        setShowGif(true); // Show the GIF when the habit is marked complete

        setTimeout(() => {
            setShowGif(false); // Hide the GIF after 2 seconds
        }, 1100); // Adjust this duration as needed
    };

    return ( 
        <>
        <li 
            className={`relative rounded-lg shadow-md p-4 flex justify-between items-center 
            ${isCompleted ? `${color} opacity-40` : color}`}
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
                onClick={() => { handleCompleteClick(habit); }}
                className={`mr-2 rounded-full p-2 transition-colors duration-200 
                    ${isCompleted ? 'bg-mustard text-dark' : 'bg-teal-50 hover:bg-pink text-gray-400'}`}
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
        {/* Animated GIF */}
        {showGif && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <img src="..\..\icons\yellow-v.gif" className="w-15 h-15 object-cover" alt="Completed" />
                </div>
            )}
        </>
    );
}

export default HabitItem;
