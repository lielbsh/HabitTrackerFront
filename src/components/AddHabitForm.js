import React, { useState } from 'react';
import { createHabit } from '../scripts/habitScript';
import { useUserData } from '../context/userContext';

const AddHabitForm = () => {
  const { user, setUser } = useUserData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submit behavior (page reload)

    // Set userId from the user context
    const habitData = { ...formData, userId: user._id }; 

    try {
      // Send the habit to the backend
      await createHabit(habitData); 
    
      // Update the user state with new habit (assuming habits is an array)
      const updatedUser = {
        ...user,
        habits: [...(user.habits || []), habitData], 
      };
      setUser(updatedUser); // Update user context with new habits

      console.log('Habit added, formData:', habitData);
      setFormData({ name: '', description: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error adding habit:', error);
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
      <button type="submit">Add Habit</button> {/* Submit button */}
    </form>
  );
};

export default AddHabitForm;
