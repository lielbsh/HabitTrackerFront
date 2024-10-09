import React, { useState } from 'react';
import { createHabit } from '../scripts/habitScript';
import { useUserData } from '../context/userContext';

const AddHabitForm = () => {
  const { user, setUser } = useUserData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const habitData = { ...formData, userId: user._id };

    try {
      const newHabit = await createHabit(habitData);

      if (newHabit) {
        const updatedUser = {
          ...user,
          habits: [...(user.habits || []), newHabit],
        };
        setUser(updatedUser);
        setFormData({ name: '', description: '', frequency: '' });
      }
    } catch (error) {
      console.error('Error adding habit:', error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl border-2 border-purple-300 relative"
    >
      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
        Add a New Habit
      </h2>
      <label className="block mb-2">
        <span className="text-gray-700">Habit Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Description:</span>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Frequency:</span>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
          className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-purple-400 transition duration-200"
      >
        Add Habit
      </button>
      <div className="absolute -top-5 -right-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-star text-purple-300 w-12 h-12"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M7.247 1.047c-.46-.92-1.778-.92-2.239 0L3.12 3.278l-2.621.383c-.958.14-1.341 1.316-.646 1.986l1.898 1.851-.448 2.614c-.163.95.832 1.675 1.68 1.228L8 10.566l2.355 1.238c.848.447 1.843-.278 1.68-1.228l-.448-2.614 1.898-1.851c.695-.67.312-1.846-.646-1.986l-2.621-.383L8.753 1.047zM8 4.27l.79 1.601.361.733.805.117 1.77.256-1.28 1.245-.512.497.121.706.318 1.86L8 9.587 6.627 10.95l.318-1.86.121-.706-.512-.497-1.28-1.245 1.77-.256.805-.117.361-.733L8 4.27z"
          />
        </svg>
      </div>
    </form>
  );
};

export default AddHabitForm;
