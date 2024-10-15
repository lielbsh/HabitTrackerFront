import React from 'react';
import { prepareChartData } from '../../utils/analyticsHelpers';
import { useUserData } from '../../context/userContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const HabitsChart = () => {
  const { user } = useUserData();
  const habits = user.habits
  
  if (!Array.isArray(habits)) {
    console.error('Habits is not an array:', habits);
    return null; 
  }

  const chartData = prepareChartData(habits); 
  console.log('chartData', chartData)

  return (
    <div className='flex flex-col items-center bg-white rounded-lg shadow-lg m-10'>
      <h2 className='text-2xl font-semibold mb-4'>Habits Chart</h2> 
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Daily" fill="#c7f98e" />
          <Bar dataKey="Weekly" fill="#fc9c9c" />
          <Bar dataKey="Monthly" fill="#89fcfe" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
