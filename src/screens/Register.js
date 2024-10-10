import React, { useState } from 'react';
import { useUserData } from '../context/userContext'; 
import SubmitButton from '../components/SubmitButton';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { setUser } = useUserData();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submitting status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true); // Set submitting state to true

    console.log('Trying to register:', formData); // Log the form data

    // Reset form and submitting state after logging
    setFormData({ username: '', email: '', password: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-lightYellow">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-grayCustom text-center">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <label htmlFor="email" className="block text-grayCustom font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-background-offwhite border-2 border-gray-300 focus:border-greenPrimary focus:outline-none focus:ring focus:ring-greenPrimary focus:ring-opacity-50"
              placeholder="Enter your email"
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
              className="w-full mt-1 p-3 rounded-lg bg-background-offwhite border-2 border-gray-300 focus:border-purple focus:outline-none focus:ring focus:ring-purple focus:ring-opacity-50"
              placeholder="Enter your password"
              required
            />
          </div>
          <SubmitButton
            isSubmitting={isSubmitting} // Pass the submitting state to the button
            text={'Sign Up'}
          />
        </form>
        <p className="text-center text-grayCustom">
          Already have an account? <a href="/" className="text-pink font-bold hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
