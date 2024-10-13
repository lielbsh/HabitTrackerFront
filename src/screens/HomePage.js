import React from 'react';
import Navbar from '../components/Navbar';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50 text-purple-900 font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Habit List */}
        <section className="md:col-span-2">
          <HabitList />
        </section>

        {/* Add Habit Form */}
        {/* <section className="md:col-span-1">
          <AddHabitForm />
        </section> */}
      </main>

      <footer className="bg-background-lightPurple p-4">
        <div className="container mx-auto text-center">
          <p className="text-white">&copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
