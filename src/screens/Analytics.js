import React from 'react';
import { HabitsChart } from '../components/analyticsComponents/HabitsChart';
import Navbar from '../components/Navbar';
import  BestStreaks from '../components/analyticsComponents/BestStreaks';
import Footer from '../components/Footer';

const Analytics = () => {

  return (
    <div className="flex-1 min-h-screen bg-slate-100 font-sans relative">
      <Navbar />
      <HabitsChart />
      <BestStreaks/>

      <Footer/>
    </div>
    
  );
};

export default Analytics;
