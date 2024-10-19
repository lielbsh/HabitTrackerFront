import axios from 'axios';

const api = 'https://habit-tracker-63zr.onrender.com/habits' || 'http://localhost:8000/habits';


// Create a new habit
export const createHabit = async (newHabit) => {
    try {
        const res = await axios.post(`${api}/create`, newHabit, {
            withCredentials: true, // Include cookies in the request
        });

        return res.data.habit; // Return the newly created habit
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Redirect to sign-in page if unauthorized
            window.location.href = '/';
        }
        console.error('Error creating habit:', error);
        return null;
    }
};

   
// Delete a habit
export const deleteHabit = async (habitId, userId) => {  
   // Send the delete request to the server
   axios.delete(`${api}/${habitId}`,{
    withCredentials: true, // Include cookies in the request
    })
    .then(res => {
        console.log(res.data.message);
        return(res.data.message)
    })
    .catch(error => {
        console.error('Error deleting habit:', error);
    });
    };

// Function for updating habit sends the updated habit to the backend
export const updateHabit = async (updatedHabit) => {  
    axios.post(`${api}/update`, {updatedHabit}, {
        withCredentials: true, // Include cookies in the request
        })
    .then(
        console.log('Habit updated!')
    )
    .catch(error => {
        console.error('Error updating habit:', error);
    });
}




