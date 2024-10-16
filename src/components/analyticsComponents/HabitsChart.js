import React from 'react';
import { prepareChartData } from '../../utils/analyticsHelpers';
import { useUserData } from '../../context/userContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const HabitsChart = () => {
  const { user } = useUserData();
  const habits = user.habits;
  
  if (!Array.isArray(habits)) {
    console.error('Habits is not an array:', habits);
    return null;
  }

  const chartData = prepareChartData(habits);
  const chartWidth = chartData.length * 100;

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg m-10 mx-20 p-2">
      <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 text-grayCustom mb-6">Track Your Progress</h2>

      {/* Scrollable Container */}
      <div
        className="w-full overflow-x-auto"
        style={{ maxWidth: '100%' }} 
      >
        {/* Inner Container with calculated width */}
        <div style={{ width: chartWidth }}>
          <ResponsiveContainer width="100%" height={400}>
            
            <BarChart data={chartData}>
              {/* <Legend layout="horizontal" verticalAlign="top" align="center" /> */}
              <Legend/>
              <CartesianGrid />
              <XAxis
                hanging={50}
                dataKey="date"
                tick={{ fontSize: 16 }}
                tickMargin={10}
              />
              <YAxis
                type="number"
                allowDecimals={false}
              />
              <Tooltip />
              <Bar dataKey="Daily" stackId="a" fill="#c7f98e" />
              <Bar dataKey="Weekly" stackId="a" fill="#fc9c9c" />
              <Bar dataKey="Monthly" stackId="a" fill="#89fcfe" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
