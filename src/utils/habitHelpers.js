
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


////////////////// Functions for streaks  /////////////////////
// Function to check if two dates are consecutive days
const areConsecutiveDays = (date1, date2) => {
    // Parse the dates into Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    console.log(d1,d2)
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);

    console.log(d1, d2)

    // Calculate the difference in days
    const dayDiff = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);
    console.log('difference in days',dayDiff)

    // Check if the dates are 1 day apart and on different calendar days
    console.log(d1.getDate(), d2.getDate())
    return dayDiff <= 1 && d1.getDate() !== d2.getDate();
  };
 

// Function to check if two dates are consecutive weeks
const areConsecutiveWeeks = (_date1, _date2) => {
    const date1 = new Date(_date1);
    const date2 = new Date(_date2);
    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const dayOfWeek = firstDayOfYear.getDay(); 
      const firstSunday = new Date(firstDayOfYear);
  
      if (dayOfWeek !== 0) {
        firstSunday.setDate(firstSunday.getDate() + (7 - dayOfWeek));
      }
  
      const diffInMs = date - firstSunday;
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const daysSinceFirstSunday = Math.floor(diffInMs / oneDayInMs);
  
      return Math.floor(daysSinceFirstSunday / 7) + 1;
    }
  
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    const week1 = getWeekNumber(d1);
    const week2 = getWeekNumber(d2);
  
    if (year1 === year2) {
      return Math.abs(week1 - week2) === 1;
    } else if (year2 === year1 + 1 && week1 === getWeekNumber(new Date(year1, 11, 31))) {
      return week2 === 1;
    } else if (year1 === year2 + 1 && week2 === getWeekNumber(new Date(year2, 11, 31))) {
      return week1 === 1;
    }
  
    return false;
  };
  

// Function to check if two dates are consecutive months
const areConsecutiveMonths = (_date1, _date2) => {
const date1 = new Date(_date1);
const date2 = new Date(_date2);

const year1 = date1.getFullYear();
const year2 = date2.getFullYear();
const month1 = date1.getMonth();
const month2 = date2.getMonth();

if (year1 === year2 && Math.abs(month1 - month2) === 1) {
    return true;
}
return false;
};

/////////////////////////////////////// 

// Updates the habit's completion dates and checks if the habit streak should be continued or reset.
export const updateHabitCompletion = (habitToUpdate) => {
    const today = new Date(); // Completion day
    console.log('today',today);
    console.log(habitToUpdate)
    const frequencyKey = habitToUpdate.frequency.toLowerCase();


    // Function to check if the streak should be increased
    const isStreakContinued = (lastCompletionDate) => {
        // No previous completion, no streak
        if (!lastCompletionDate) {
            console.log('No previous completion, no streak')
            return false
        }; 

        const lastDate = new Date(lastCompletionDate);
        console.log('lastDate',lastDate)

         // Define streak conditions based on frequency
        if (frequencyKey === 'daily') {
            console.log('daily', 'isSameDay?',areConsecutiveDays(lastDate, today))
            return areConsecutiveDays(lastDate, today);
        } else if (frequencyKey === 'weekly') {
            return areConsecutiveWeeks(lastDate, today);
        } else if (frequencyKey === 'monthly') {
            return areConsecutiveMonths(lastDate, today);
        } else {
            console.log('else')
        }
        return false;
    };

    // Update habit with new completion date and potentially increase streak
    const lastCompletionDate = habitToUpdate.completedDates[habitToUpdate.completedDates.length - 1];
    console.log('lastCompletionDate', lastCompletionDate)
    const streakContinued = isStreakContinued(lastCompletionDate);
    console.log('streak Continued?', streakContinued)

    return {
        ...habitToUpdate,
        completedDates: [...habitToUpdate.completedDates, today],
        streak: streakContinued ? habitToUpdate.streak + 1 : 1, // Reset to 1 if streak is broken
    }
};



// Function to check if a habit is completed for today
export const isHabitCompleted = (habit, today) => {
    if (!habit.completedDates || habit.completedDates.length === 0) {
        return false;
    }

    const lastCompletedDate = new Date(habit.completedDates[habit.completedDates.length - 1]);

    if (habit.frequency === 'Daily') {
        // Check if the last completed date is the same as today 
        return (
            lastCompletedDate.getDate() === today.getDate() &&
            lastCompletedDate.getMonth() === today.getMonth() &&
            lastCompletedDate.getFullYear() === today.getFullYear()
        );
    }

    if (habit.frequency === 'Weekly') {
        // Check if the last completed date is within the same calendar week as today
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        
        return lastCompletedDate >= oneWeekAgo && lastCompletedDate <= today;
    }

    if (habit.frequency === 'Monthly') {
        // Check if the last completed date is within the same calendar month as today
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        oneMonthAgo.setDate(1); // Start of the last month
        
        return lastCompletedDate >= oneMonthAgo && lastCompletedDate <= today;
    }

    return false;
};




// Function to sort the habits (called when habits change)
export const sortHabitsByCompletion = (setHabits) => {
    const day = new Date();
    setHabits((prevHabits) => ({
        daily: [...prevHabits.daily].sort((a, b) => isHabitCompleted(a, day) - isHabitCompleted(b, day)),
        weekly: [...prevHabits.weekly].sort((a, b) => isHabitCompleted(a, day) - isHabitCompleted(b, day)),
        monthly: [...prevHabits.monthly].sort((a, b) => isHabitCompleted(a, day) - isHabitCompleted(b, day)),
    }));
};