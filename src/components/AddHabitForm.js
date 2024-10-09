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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submit behavior (page reload)

    // Construct habit data with userId
    const habitData = { ...formData, userId: user._id }; 

    try {
        // Send the habit to the backend!
        const newHabit = await createHabit(habitData); 
        
        // Check if newHabit is returned correctly
        if (newHabit) {
            // Update the user state with new habit
            const updatedUser = {
                ...user,
                habits: [...(user.habits || []), newHabit], 
            };
            setUser(updatedUser); // Update user context with new habits

            console.log('Habit added:', newHabit);
            // Reset form after successful submission
            setFormData({ name: '', description: '', frequency: '' });
        } else {
            console.error('Failed to add habit: No habit returned from backend');
        }
    } catch (error) {
        console.error('Error adding habit:', error.response?.data || error.message);
    }
};

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the corresponding form data field
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Habit Name:
        <input
          type="text"
          name="name" 
          value={formData.name} // Controlled input value from state
          onChange={handleChange} // Update state on input change
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description" 
          value={formData.description} // Controlled input value from state
          onChange={handleChange} // Update state on input change
          required
        />
      </label>
      <br />
      <select
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        required
      >
        <option value="">Select Frequency</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <br />
      <button type="submit">Add Habit</button> {/* Submit button */}
    </form>
  );
};

export default AddHabitForm;
