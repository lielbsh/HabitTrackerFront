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
import { format, parse } from 'date-fns';


export const HabitsChart = () => {
  const { user } = useUserData();
  const habits = user.habits;
  
  if (!Array.isArray(habits)) {
    console.error('Habits is not an array:', habits);
    return null;
  }

  const chartData = prepareChartData(habits);
  const chartWidth = chartData.length * 90;

  // Custom tick formatter to show both the date and day of the week
// const tickFormatter = (dateString) => {
//   // Parse the date string into a valid Date object
//   const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

//   // Check if the parsed date is valid before formatting
//   if (isNaN(parsedDate)) {
//     console.error('Invalid date encountered:', dateString);
//     return ''; // Return empty if date is invalid
//   }

//   const dayOfWeek = format(parsedDate, 'EEE'); // Get day of the week
//   const formattedDate = format(parsedDate, 'yy/MM/dd'); // Format date
//   return `${formattedDate}\n${dayOfWeek}`; // Display both date and day of the week
// };

const CustomTick = ({ x, y, payload }) => {
  const date = parse(payload.value, 'dd-MM-yy', new Date());
  const dayOfWeek = format(date, 'EEE'); // Get day of the week (e.g., 'Mon')
  const formattedDate = format(date, 'dd/MM/yy'); // Format the date

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fill="#666">
        {formattedDate}
      </text>
      <text x={0} y={14} dy={10} textAnchor="middle" fill="#666">
        {dayOfWeek}
      </text>
    </g>
  );
};

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg m-10 mx-20 p-2">
      <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 text-grayCustom mb-2">Track Your Progress</h2>

      {/* Scrollable Container */}
      <div
        className="w-full overflow-x-auto"
        style={{ maxWidth: '100%' }} 
      >
        {/* Inner Container with calculated width */}
        <div style={{ width: chartWidth, height: 400 }}>
          <ResponsiveContainer width="100%">
            
            <BarChart data={chartData} align="center">
                            <Legend 
                verticalAlign="top" 
                align="center" 
              />
              
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tick={<CustomTick />}
                tickMargin={5} // Adjust margin for extra space
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
