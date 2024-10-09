import axios from 'axios';

const api = 'http://localhost:8000/habits'

// Get all habits
// export const getHabits = async () => {
//   try {
//       const res = await axios.get(api);
//       console.log('res.data',res.data)
//       return res.data;
//   } catch (error) {
//       console.error('Error fetching habits:', error);
//   }
// }

// Create a new habit
export const createHabit = async (newHabit) => {  // the userId is inside the newHabit
    return await axios.post(api, newHabit)
        .then(res => {
           return res.data.habit
    })

        .catch (error => {
        console.error('Error creating habit:', error)
        return null;
    })       
}
   
    
    // try {
    //     const req = await axios.post(api, newHabit);
    //     return req.data; // Return the newly created habit
    


