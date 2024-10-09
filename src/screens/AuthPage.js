import React from 'react';
import { Link } from 'react-router-dom'; 
import LoginForm from '../components/LoginForm'; 
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Welcome! log in here</h1>
      <LoginForm /> 
      <Link to={'/signup'} >Dont have an account?</Link> 
      
    </div>
  );
};

export default AuthPage;
