import React from 'react';
import { HabitsChart } from '../components/analyticsComponents/HabitsChart';
import Navbar from '../components/Navbar';
import  BestStreaks from '../components/analyticsComponents/BestStreaks';
import Footer from '../components/Footer';

const Analytics = () => {

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans relative overflow-auto">
      <Navbar />
      <div className="px-20 py-10">
        <HabitsChart />
        <BestStreaks/>
      </div>
      <Footer/>
    </div>
    
  );
};

export default Analytics;
