import React from 'react';
import { HabitsChart } from '../components/analyticsComponents/HabitsChart';
import Navbar from '../components/Navbar';

const Analytics = () => {

  return (
    <div className="flex-1 min-h-screen bg-slate-100 text-purple-900 font-sans relative">
      <Navbar />
      <h1 className='text-3xl text-center mb-8 mt-4'>Analytics</h1>
      <HabitsChart />
    </div>
    
  );
};

export default Analytics;
