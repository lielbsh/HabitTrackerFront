import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using react-router
import { logout } from '../api/userScript';
import { useUserData } from '../context/userContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setUser } = useUserData();
  const toggleMenu = () => setIsOpen(!isOpen);

  // Define navigation links
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Logout', path: '/' }, // Path is still necessary for the link, but handled in the click event
  ];

  const handleLogout = async () => {
    await logout(setUser); // Call the logout function
    // Redirect to the login page
    window.location.href = '/HabitTrackerFront/';
  };

  return (
    <nav className="bg-background-lightPurple p-4 shadow-md font-serif">
      <div className="container mx-auto flex justify-between items-center">
        {/* Habit Tracker */}
        <Link to="/home" className="flex items-center">
          <span className="text-3xl font-dosis font-bold text-white hover:text-pink">Habit Tracker</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-pink focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            // Close Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-inherit md:bg-transparent transition-all duration-300 ease-in ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="mt-4 md:mt-0">
              {link.name === 'Logout' ? (
                <button
                  className={`block px-4 py-2 text-lg font-medium rounded ${
                    location.pathname === link.path
                      ? 'text-pink'
                      : 'text-white hover:text-pink'
                  } transition-colors duration-300`}
                  onClick={handleLogout} // Trigger logout on click
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`block px-4 py-2 text-lg font-medium rounded ${
                    location.pathname === link.path
                      ? 'text-pink'
                      : 'text-white hover:text-pink'
                  } transition-colors duration-300`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
