import React, { useState } from 'react';
import { useUserData } from '../context/userContext'; 

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newUser = await signUp(formData, setUser); // Call signUp function
//       if (newUser) {
//         setUser(newUser); // Update global user state if needed
//         console.log('User signed up:', newUser);
//       } else {
//         console.error('Sign up failed');
//       }
//     } catch (error) {
//       console.error('Error during sign up:', error);
//     }

//     // Reset form after submission
//     setFormData({ 
//       username: '',
//       email: '',
//       password: '',
//     });
//   };

  return (
    <form onSubmit={()=>{}}>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
