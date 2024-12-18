import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import LoginForm from '../components/LoginForm.jsx'


export const Home = () => {
  const handleLogin = (userName, password) => {
    console.log("Logged in with:", userName, password);
    // Navigate to the exercise page or save the user state
  };

    return (
        <div className='home-container'>
          <h1 className='my-math'>MyMath</h1>
          <p className='welcome-msg'>Welcome to MyMath!</p>
          <LoginForm onSubmit={handleLogin} />
          <Link className="to-exercise" to="/exercise">Let's Start Learning!</Link>
        </div>
      );

};
