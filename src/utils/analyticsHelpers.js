import { format, toZonedTime } from 'date-fns-tz';


export const prepareChartData = (habits) => {
    const today = new Date();
    const chartData = [];
    
    // Find the earliest start date
    const startDates = habits.map(habit => new Date(habit.startDate));
    const earliestDate = new Date(Math.min(...startDates));
    
    // Generate all dates between earliest and today
    const dateArray = [];
    let currentDate = new Date(earliestDate);
    currentDate.setHours(0,0,0)

    while (currentDate <= today) {
        dateArray.push(formatToLocal(currentDate)); // Keep date as a Date object
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Loop through each date and count completed habits for Daily, Weekly, and Monthly
    dateArray.forEach((date) => {

        let dailyCount = 0;
        let weeklyCount = 0;
        let monthlyCount = 0;

        habits.forEach(habit => {
            if (habit.frequency === 'Daily' && checkCompletionHistory(habit, date)) {
                dailyCount++;
            } else if (habit.frequency === 'Weekly' && checkCompletionHistory(habit, date)) {
                weeklyCount++;
            } else if (habit.frequency === 'Monthly' && checkCompletionHistory(habit, date)) {
                monthlyCount++;
            }
        });

        chartData.push({
            date: format(date, 'dd-MM-yy', { timeZone: 'Asia/Jerusalem' }),
            Daily: dailyCount,
            Weekly: weeklyCount,
            Monthly: monthlyCount
        });
    }); 

    return chartData;
};

const checkCompletionHistory = (habit, formattedDate) => {
    // Check if the formatted date exists in the completedDates array
    return habit.completedDates.some((dateItem) => {
        const date = toZonedTime(dateItem, 'Asia/Jerusalem')
        return formatToLocal(date) === formattedDate;
    });
};


 // Format the input date to (YYYY-MM-DD) format 
export const formatToLocal = (date) => {
    const localDate = toZonedTime(date, 'Asia/Jerusalem')
    return  format(localDate, 'yyyy-MM-dd', { timeZone: 'Asia/Jerusalem' })
}


// Best Current streaks calculator
export const bestStreaks = (habitsList) => {
    let bestDailyStreak = {streak: 0}
    let bestWeeklyStreak = {streak: 0}
    let bestMonthlyStreak = {streak: 0}
  
    habitsList.daily.forEach(habit => {
      if (habit.streak > bestDailyStreak.streak) {
        bestDailyStreak = habit;
      }
    });
  
    habitsList.weekly.forEach(habit => {
      if (habit.streak > bestWeeklyStreak.streak) {
        bestWeeklyStreak = habit;
      }
    });
  
    habitsList.monthly.forEach(habit => {
      if (habit.streak > bestMonthlyStreak.streak) {
        bestMonthlyStreak = habit;
      }
    });
  
    const bestStreaks = {
        'bestDailyStreak': bestDailyStreak,
        'bestWeeklyStreak': bestWeeklyStreak,
        'bestMonthlyStreak': bestMonthlyStreak
    };
    return bestStreaks
}

// Best records streaks
export const bestOfAllTimes = (habitsList) => {
    let dailyStreakRecord = { bestStreak: 0 };
    let weeklyStreakRecord = { bestStreak: 0 };
    let monthlyStreakRecord = { bestStreak: 0 };

    habitsList.daily.forEach(habit => {
        if (habit.bestStreak > dailyStreakRecord.bestStreak) {
            dailyStreakRecord = habit;
        }
    });

    habitsList.weekly.forEach(habit => {
        if (habit.bestStreak > weeklyStreakRecord.bestStreak) {
            weeklyStreakRecord = habit;
        }
    });

    habitsList.monthly.forEach(habit => {
    if (habit.bestStreak > monthlyStreakRecord.bestStreak) {
        monthlyStreakRecord = habit;
        }
    })

    const streaksRecords = {
        'dailyStreakRecord': dailyStreakRecord,
        'weeklyStreakRecord': weeklyStreakRecord,
        'monthlyStreakRecord': monthlyStreakRecord,
    };

    return streaksRecords;
};





