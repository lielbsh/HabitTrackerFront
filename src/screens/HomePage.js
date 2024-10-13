import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-100 text-purple-900 font-sans relative">
      <Navbar />

      <HabitList />

      {/* Floating Button to open the form */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="fixed right-4 bottom-10 bg-purple-400 text-white p-4 rounded-full shadow-lg"
      >
        Add Habit
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
        className={`fixed right-0 top-0 h-fit w-1/3 bg-white p-6 shadow-lg z-20 transform ${
          isFormVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <AddHabitForm />
      </div>

      {/* Footer */}
      <footer className="bg-background-lightPurple p-4">
        <div className="container mx-auto text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
