import React, { useState } from 'react';
import { logIn } from '../scripts/userScript'; 
import { useUserData } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useUserData();
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submitting status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      const loggedInUser = await logIn(formData, setUser);
      if (loggedInUser._id) {
        setUser(loggedInUser);
        navigate('/home');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of the outcome
      setFormData({ username: '', password: '' }); // Reset form data
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-lightPurple">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-grayCustom text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-grayCustom font-semibold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-background-offwhite border-2 border-gray-300 focus:border-pink focus:outline-none focus:ring focus:ring-pink focus:ring-opacity-50"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-grayCustom font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-background-offwhite border-2 border-gray-300 focus:border-pink focus:outline-none focus:ring focus:ring-pink focus:ring-opacity-50"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <SubmitButton
            isSubmitting={isSubmitting} // Pass the submitting state to the button
            text={'Log In'}
          />
        </form>
        <p className="text-center text-grayCustom">
          Don’t have an account? <a href="/signup" className="text-pink font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
