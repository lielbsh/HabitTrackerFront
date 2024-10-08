import React, { useState } from 'react';
import { logIn } from '../scripts/userScript'; 
import { useUserData } from '../context/userContext';

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useUserData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loggedInUser = await logIn(formData, setUser); // Call logIn function
      if (loggedInUser) {
        setUser(loggedInUser); // Update global user state
        console.log('User logged in:', loggedInUser);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // Reset form after submission
    setFormData({ 
      username: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;
