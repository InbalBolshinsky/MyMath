import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';
import { LoginForm } from './LoginForm' 

export const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleLoginSubmit = (userName: string, password: string) => {
    if (!userName.trim() || !password.trim()) {
      console.error("Username and password cannot be empty.");
    }
    else {
    console.log("Username:", userName);
    console.log("Password:", password);
    }
    setPopupOpen(false); // Close the popup after submission
    return;
  };

    return (
        <div className='home-container'>
          <h1 className='my-math'>MyMath</h1>
          <p className='welcome-msg'>Welcome to MyMath!</p>
          <button className='open-login' onClick={() => setPopupOpen(true)}>Open Login</button>
          <LoginForm
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onSubmit={handleLoginSubmit}
          />
          <Link className="to-exercise" to="/exercise">Let's Start Learning!</Link>
        </div>
      );

};
