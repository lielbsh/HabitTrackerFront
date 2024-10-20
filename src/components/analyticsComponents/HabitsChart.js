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


const HabitsChart = () => {
  const { user } = useUserData();
  const habits = user.habits;
  
  if (!Array.isArray(habits)) {
    console.error('Habits is not an array:', habits);
    return null;
  }

  const chartData = prepareChartData(habits);
  const chartWidth = chartData.length * 90;

const CustomTick = ({ x, y, payload }) => {
  const date = parse(payload.value, 'dd-MM-yy', new Date());
  const dayOfWeek = format(date, 'EEE'); // Get day of the week (e.g., 'Mon')
  const formattedDate = format(date, 'dd/MM'); // Format the date

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fill="#666" fontSize={14}>
        {formattedDate}
      </text>
      <text x={0} y={14} dy={10} textAnchor="middle" fill="#666" fontSize={14}>
        {dayOfWeek}
      </text>
    </g>
  );
};

  return (
  <div className="flex flex-col items-center bg-white rounded-lg shadow-lg py-8">
    <h2 className="text-3xl font-semibold border-b-2 border-gray-300 pb-2 text-grayCustom mb-4">Track Your Progress</h2>

    {/* Scrollable Container */}
    <div className="w-full overflow-x-auto">
      {/* Inner Container with responsive width */}
      <div className="w-full" style={{ maxWidth: chartWidth }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} align="center">
            <Legend verticalAlign="top" align="center" />
            <CartesianGrid />
            <XAxis
              dataKey="date"
              tick={<CustomTick />}
              tickMargin={5} // Adjust margin for extra space
              interval={0}
            />
            <YAxis type="number" allowDecimals={false} />
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

export default HabitsChart;