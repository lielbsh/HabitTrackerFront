import axios from 'axios';

const api = 'http://localhost:8000/habits'

// Get all habits
export const getHabits = async () => {
  try {
      const res = await axios.get(api);
      console.log('res.data',res.data)
      return res.data;
  } catch (error) {
      console.error('Error fetching habits:', error);
  }
}

// Create a new habit
export const createHabit = async (newHabit) => {
    try {
        const res = await axios.post(api, newHabit);
        return res.data; // Return the newly created habit
    } catch (error) {
        console.error('Error creating habit:', error);
        return null;
    }
}

