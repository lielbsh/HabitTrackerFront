import React, { useState } from 'react';
import { logIn } from '../scripts/userScript'; 
import { useUserData } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useUserData();
  const navigate = useNavigate(); // Initialize useHistory hook

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
        navigate('/home'); // Redirect to HomePage
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

export default LoginForm;
