import React, { useState } from 'react';
import { createHabit } from '../../api/habitScript';
import { useUserData } from '../../context/userContext';
import SubmitButton from '../SubmitButton';

const AddHabitForm = () => {
  const { user, setUser } = useUserData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'Daily',
  });

  const [errors, setErrors] = useState({ name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: 'Habit name must be at least 3 letters long.',
      }));
      return;
    }

    const habitData = { ...formData, userId: user._id };

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const newHabit = await createHabit(habitData);

      if (newHabit) {
        const updatedUser = {
          ...user,
          habits: [...(user.habits || []), newHabit],
        };
        setUser(updatedUser);
        setFormData({ name: '', description: '', frequency: 'Daily', startDate: new Date() });
        setFeedback({ type: 'success', message: 'Habit added successfully!' });
      }
    } catch (error) {
      const errorMsg = error.message || 'Error adding habit.';

      setFeedback({ type: 'error', message: errorMsg });

      console.error('Error adding habit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'name' && value.length < 3 && value.length > 0) {
      setErrors((prev) => ({
        ...prev,
        name: 'Habit name must be at least 3 letters long.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: '',
      }));
    }

    setFeedback({ type: '', message: '' });
  };

  return (
    <div className="flex justify-center items-center px-1 h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-background-lightPurple p-6 rounded-lg shadow-xl border-2 border-purple-300 relative w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Add a New Habit</h2>

        {/* Feedback Messages */}
        {feedback.message && (
          <div
            className={`mb-4 p-3 rounded-md text-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            role="alert"
          >
            {feedback.message}
          </div>
        )}

        <label className="block mb-4">
          <span className="text-grayCustom">Habit Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Morning Jog"
            className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        <label className="block mb-4">
          <span className="text-grayCustom">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your habit..."
            rows="3"
            className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
          ></textarea>
        </label>

        <label className="block mb-4">
          <span className="text-grayCustom">Frequency</span>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-pink focus:border-pink transition duration-200"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>

        {/* <label htmlFor="start-date" className="block mb-6">
          <span className="text-grayCustom">Start Date</span>
          <input
            type="date"
            id="start-date"
            name="start-date"
            className="mt-1 block w-full p-3 rounded-lg bg-background-offwhite border-2 border-gray-300 focus:border-pink focus:outline-none focus:ring focus:ring-pink focus:ring-opacity-50"
          />
        </label> */}


        <SubmitButton isSubmitting={isSubmitting} text="Add Habit" />
      </form>
    </div>
  );
};

export default AddHabitForm;
