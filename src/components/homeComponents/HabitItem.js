import React, {useState} from 'react';
import SubmitButton from '../SubmitButton';


const HabitItem = ({ habit, color, handleDelete, handleComplete, isCompleted, handleUpdate }) => {
    const [showGif, setShowGif] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // for editing the habit
    const [updatedHabit, setUpdatedHabit] = useState(habit);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCompleteClick = (habit) => {
        handleComplete(habit);
        setShowGif(true); // Show the GIF 
        setTimeout(() => {
            setShowGif(false); 
        }, 1100); 
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdatedHabit({ ...updatedHabit, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        handleUpdate(updatedHabit); 
        setIsEditing(false);
        setIsSubmitting(false);
    };

    return (
        <>
            <li
                className={`relative rounded-lg shadow-md p-4 flex justify-between items-center transition-transform transform-gpu duration-200 hover:ring-4 hover:ring-opacity-75 hover:ring-offset-2 hover:ring-background-lightPurple ${isCompleted ? `${color} opacity-40` : color}`}

                key={habit._id}
                onClick={() => { setIsEditing(false); setIsExpanded(!isExpanded);}} // Toggle accordion on click
            >
                {/* Habit Title */}
                <div className="flex-1 cursor-pointer">
                    <h3 className="text-xl font-semibold text-dark">{habit.name}</h3>
                </div>

                {/* Check Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleCompleteClick(habit); }}
                    className={`mr-2 rounded-full p-2 transition-colors duration-200 
                        ${isCompleted ? 'bg-mustard text-teal-50' : 'bg-teal-50 hover:bg-pink text-gray-400'}`}
                    aria-label="Mark as complete"
                    disabled={isCompleted}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </li>
            {/* Animated GIF */}
            {showGif && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <img 
                src={`${process.env.PUBLIC_URL}/icons/yellow-v.gif`}
                className="w-15 h-15 object-cover" 
                alt="Completed" 
                />
            </div>
            )}
            {/* Expanded Section for Details and Editing */}
            {isExpanded && (
                <div className="p-4 border-t border-gray-300 bg-gray-50">
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit} className="flex flex-col">
                            <input
                                type="text"
                                name="name"
                                value={updatedHabit.name}
                                onChange={handleEditChange}
                                required
                                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
                            />
                            <input
                                type="text"
                                name="description"
                                value={updatedHabit.description}
                                onChange={handleEditChange}
                                required
                                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
                            />
                            <select
                                name="frequency"
                                value={updatedHabit.frequency}
                                onChange={handleEditChange}
                                required
                                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>

                            {/* Custom SubmitButton component */}
                            <SubmitButton 
                                isSubmitting={isSubmitting} 
                                text="Save" 
                            />
                            {/* Cancel button*/}
                            <button 
                                type="button" 
                                onClick={() => { setIsEditing(false) }} 
                                className="`w-full py-3 px-4 rounded-full shadow-md transition duration-300 transform hover:bg-slate-300 hover:scale-105'"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <>
                            <p className="text-grayCustom text-lg">{habit.description}</p>
                            <p className="text-mustard text-lg font-medium mt-2">Streak: {habit.streak} </p>

                            <div className="flex space-x-2 mt-2 justify-end"> 
                                {/* Edit Button */}
                                <button 
                                    onClick={() => setIsEditing(true)} 
                                    className="bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-4 py-1 shadow-md transition-transform duration-300 transform hover:scale-105"
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(habit._id); }}
                                    className="bg-red-400 hover:bg-red-600 text-white rounded-lg px-4 py-1 shadow-md transition-transform duration-300 transform hover:scale-105"
                                    aria-label={`Delete habit ${habit.name}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default HabitItem;
