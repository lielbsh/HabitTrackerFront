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
export const handleComplete = async (habitId, userId) => {  
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





export const filterHabitsByFrequency = (habits) => {
    const separated = {
        daily: [],
        weekly: [],
        monthly: [],
    };

    habits.forEach(habit => {
        if (habit.frequency === 'Daily') {
            separated.daily.push(habit);
        } else if (habit.frequency === 'Weekly') {
            separated.weekly.push(habit);
        } else if (habit.frequency === 'Monthly') {
            separated.monthly.push(habit);
        }
    });
    return separated;
};


