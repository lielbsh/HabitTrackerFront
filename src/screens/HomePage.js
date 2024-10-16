import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HabitList from '../components/homeComponents/HabitList';
import AddHabitForm from '../components/homeComponents/AddHabitForm';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans relative overflow-auto">
      <Navbar />

      <div className="flex-grow">
        <HabitList />
      </div>

      {/* Floating Button to open the form */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="fixed right-4 bottom-24 bg-purple-400 text-white p-4 rounded-full shadow-lg hover:bg-pink hover:scale-105 z-30"
      >
        New Habit
      </button>

      {/* Backdrop to focus on form */}
      {isFormVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeForm}
        ></div>
      )}

      {/* Sliding Side Panel Form */}
      <div
        className={`fixed right-0 top-0 w-1/3 p-6 shadow-lg z-20 transform ${
          isFormVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <AddHabitForm />
      </div>

      {/* Footer */}
      <Footer className="mt-auto" /> 
    </div>
  );
};

export default HomePage;