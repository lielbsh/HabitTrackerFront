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
    return await axios.delete(`${api}/${habitId}`, {
        headers: {
            'user-id': userId
        }
    })
    .then(res => {
        return res.data.habits;
    })
    .catch(error => {
        console.error('Error deleting habit:', error);
        return null;
    });
}

// Handle Complete
export const completeHabit = async (habit) => {  
    return await axios.post(`${api}/complete`, {habit})
    .then(res => {
        console.log('res data',res.data.updatedHabit)
        return res.data.updatedHabit;
    })
    .catch(error => {
        console.error('Error Completing habit:', error);
        return null;
    });
}




