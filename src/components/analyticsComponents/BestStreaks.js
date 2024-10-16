import React, { useEffect, useState } from 'react'
import { bestStreaks, bestOfAllTimes } from '../../utils/analyticsHelpers';
import { useUserData } from '../../context/userContext';
import { filterHabitsByFrequency } from '../../utils/habitHelpers';
import { FaTrophy } from 'react-icons/fa';

const BestStreaks = () => {
  const { user } = useUserData();
  const [bestCurrentHabit, setBestCurrentHabit] = useState({
    bestDailyStreak: {},
    bestWeeklyStreak: {},
    bestMonthlyStreak: {},
  });
  const [bestAllTimeHabit, setBestAllTimeHabit] = useState({
    dailyStreakRecord: {},
    weeklyStreakRecord: {},
    monthlyStreakRecord: {},
  });

  useEffect(() => {
    if (user.habits) {
      const habitsList = filterHabitsByFrequency(user.habits);
      
      // Calculate best current streaks
      const bestStreaksData = bestStreaks(habitsList);
      setBestCurrentHabit(bestStreaksData);
      
      // Calculate best of all time streaks
      const bestOfAllTimeData = bestOfAllTimes(habitsList);
      setBestAllTimeHabit(bestOfAllTimeData);
    }
  }, [user.habits]);

  return (
    <div className="p-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Best Current Streaks</h1>
      <div className="flex justify-center space-x-6">
        {/* Best Daily Streak */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Daily Streak
          </h2>
          {bestCurrentHabit.bestDailyStreak.streak ? (
            <>
              <p className="text-lg">{bestCurrentHabit.bestDailyStreak.name}</p>
              <p className="text-4xl font-bold mt-4">{bestCurrentHabit.bestDailyStreak.streak} days</p>
            </>
          ) : (
            <p className="text-gray-500">No streak yet. Keep going!</p>
          )}
        </div>

        {/* Best Weekly Streak */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Weekly Streak
          </h2>
          {bestCurrentHabit.bestWeeklyStreak.streak ? (
            <>
              <p className="text-lg">{bestCurrentHabit.bestWeeklyStreak.name}</p>
              <p className="text-4xl font-bold mt-4">{bestCurrentHabit.bestWeeklyStreak.streak} weeks</p>
            </>
          ) : (
            <p className="text-gray-500">No streak yet. Keep going!</p>
          )}
        </div>

        {/* Best Monthly Streak */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Monthly Streak
          </h2>
          {bestCurrentHabit.bestMonthlyStreak.streak ? (
            <>
              <p className="text-lg">{bestCurrentHabit.bestMonthlyStreak.name}</p>
              <p className="text-4xl font-bold mt-4">{bestCurrentHabit.bestMonthlyStreak.streak} months</p>
            </>
          ) : (
            <p className="text-gray-500">No streak yet. Keep going!</p>
          )}
        </div>
      </div>

      {/* Best of All Time Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-10 mb-4">Your Best Streaks of All Time</h1>
      <div className="flex justify-center space-x-6">
        {/* Best Daily Streak of All Time */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Daily Streak
          </h2>
          {bestAllTimeHabit.dailyStreakRecord.bestStreak ? (
            <>
              <p className="text-lg">{bestAllTimeHabit.dailyStreakRecord.name}</p>
              <p className="text-4xl font-bold mt-4">{bestAllTimeHabit.dailyStreakRecord.bestStreak} days</p>
            </>
          ) : (
            <p className="text-gray-500">No best daily streak yet.</p>
          )}
        </div>

        {/* Best Weekly Streak of All Time */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Weekly Streak
          </h2>
          {bestAllTimeHabit.weeklyStreakRecord.bestStreak ? (
            <>
              <p className="text-lg">{bestAllTimeHabit.weeklyStreakRecord.name}</p>
              <p className="text-4xl font-bold mt-4">{bestAllTimeHabit.weeklyStreakRecord.bestStreak} weeks</p>
            </>
          ) : (
            <p className="text-gray-500">No best weekly streak yet.</p>
          )}
        </div>

        {/* Best Monthly Streak of All Time */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md w-1/3 text-center">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Monthly Streak
          </h2>
          {bestAllTimeHabit.monthlyStreakRecord.bestStreak ? (
            <>
              <p className="text-lg">{bestAllTimeHabit.monthlyStreakRecord.name}</p>
              <p className="text-4xl font-bold mt-4">{bestAllTimeHabit.monthlyStreakRecord.bestStreak} months</p>
            </>
          ) : (
            <p className="text-gray-500">No best monthly streak yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestStreaks;
