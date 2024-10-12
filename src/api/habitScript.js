import axios from 'axios';

const api = 'http://localhost:8000/habits'


// Create a new habit
export const createHabit = async (newHabit) => {  // the userId is inside the newHabit
    return await axios.post(`${api}/create`, newHabit)
        .then(res => {
            console.log('res.data',res.data)
            return res.data.habit
        })

        .catch (error => {
        console.error('Error creating habit:', error)
        return null;
    })       
}
   
// Delete a habit
export const deleteHabit = async (habitId, userId) => {  
   // Send the delete request to the server
   axios.delete(`${api}/${habitId}`, {
    headers: {
        'user-id': userId
    }
    })
    .then(res => {
        console.log('Habit deleted successfully:', res.data.habits);
    })
    .catch(error => {
        console.error('Error deleting habit:', error);
    });
    };

// Function for updating habit sends the updated habit to the backend
export const updateHabit = async (updatedHabit) => {  
    axios.post(`${api}/update`, {updatedHabit})
    .then(
        console.log('Habit updated!!', updatedHabit)
    )
    .catch(error => {
        console.error('Error updating habit:', error);
    });
}




