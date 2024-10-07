import React, { useState } from 'react';
import { createHabit } from '../scripts/habitScript';
import {useData} from '../context/DataContext';

const AddHabitForm = () => {
  const {habits, setHabits } = useData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submit behavior (page reload)
    try {
        setHabits((prevHabits) => [...prevHabits, formData])
        await createHabit(formData) // Send the habit to the backend
        console.log('habit added, formData:', formData)
        console.log(habits)
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
      <button type="submit">Add Habit</button> {/* Submit button to trigger onSubmit */}
  </form>
  );
};

export default AddHabitForm;