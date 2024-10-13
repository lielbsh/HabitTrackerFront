import { updateHabit } from '../api/habitScript'

// Separates the Habits by their frequencies 
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


// Updates the habit's completion dates and checks if the habit streak should be continued or reset.
export const updateHabitCompletion = (prevHabits, habitToUpdate) => {
    // Get today's date
    const today = new Date();

    // Determine which frequency category the habit belongs to
    const frequencyKey = habitToUpdate.frequency.toLowerCase();

    // Function to calculate the difference in days between two dates
    const getDaysDifference = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Function to check if the streak should be increased
    const isStreakContinued = (lastCompletionDate) => {
        if (!lastCompletionDate) return false; // No previous completion, no streak

        const daysDiff = getDaysDifference(new Date(lastCompletionDate), today);

        // Define streak conditions based on frequency
        if (frequencyKey === 'daily' && daysDiff === 1) {
            return true;
        } else if (frequencyKey === 'weekly' && daysDiff <= 7) {
            return true;
        } else if (frequencyKey === 'monthly' && daysDiff <= 30) {
            return true;
        }
        return false;
    };

    // Update the completedDates for the habit
    const updatedHabits = prevHabits[frequencyKey].map((habit) => {
        if (habit._id === habitToUpdate._id) {
            const lastCompletionDate = habit.completedDates[habit.completedDates.length - 1];
            const streakContinued = isStreakContinued(lastCompletionDate);

            // Update habit with new completion date and potentially increase streak
            return {
                ...habit,
                completedDates: [...habit.completedDates, today],
                streak: streakContinued ? habit.streak + 1 : 1, // Reset to 1 if streak is broken
            };
        }
        return habit;
    });

    // Move the completed habit to the end of the list
    const completedHabit = updatedHabits.find(habit => habit._id === habitToUpdate._id);
    const filteredHabits = updatedHabits.filter(habit => habit._id !== habitToUpdate._id);
    const rearrangedHabits = [...filteredHabits, completedHabit];
    
    // Send request to the server to update the habit in the cloud
    updateHabit(completedHabit);

    // Return the new state with the updated habit
    return {
        ...prevHabits,
        [frequencyKey]: rearrangedHabits,
    };
};



// Function to check if a habit is completed for today
export const isHabitCompleted = (habit) => {
    if (!habit.completedDates || habit.completedDates.length === 0) {
        return false;
    }

    const lastCompletedDate = new Date(habit.completedDates[habit.completedDates.length - 1]);
    const today = new Date();

    if (habit.frequency === 'Daily') {
    // Check if the last completed date is the same as today 
    return (
        lastCompletedDate.getDate() === today.getDate() &&
        lastCompletedDate.getMonth() === today.getMonth() &&
        lastCompletedDate.getFullYear() === today.getFullYear()
    )};

    if (habit.frequency === 'Weekly') {
         // Check if the last completed date is within the same calendar week as today
         const oneWeekAgo = new Date();
         oneWeekAgo.setDate(today.getDate() - 7);
 
         return lastCompletedDate >= oneWeekAgo && lastCompletedDate <= today;
    }

    if (habit.frequency === 'Monthly') {
        // Check if the last completed date is within the same calendar month as today
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        return lastCompletedDate >= oneMonthAgo && lastCompletedDate <= today;
    }
    
    return false;
};



// Function to sort the habits (called when habits change)
export const sortHabitsByCompletion = (setHabits) => {
    setHabits((prevHabits) => ({
      daily: [...prevHabits.daily].sort((a, b) => isHabitCompleted(a) - isHabitCompleted(b)),
      weekly: [...prevHabits.weekly].sort((a, b) => isHabitCompleted(a) - isHabitCompleted(b)),
      monthly: [...prevHabits.monthly].sort((a, b) => isHabitCompleted(a) - isHabitCompleted(b)),
    }));
  };