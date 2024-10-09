import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-background-green p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Habit Tracker</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-grayCustom hover:text-mustard">Home</a>
          </li>
          <li>
            <a href="#" className="text-grayCustom hover:text-mustard">About</a>
          </li>
          <li>
            <a href="#" className="text-grayCustom hover:text-mustard">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;