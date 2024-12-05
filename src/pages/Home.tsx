import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'

export const Home = () => {
    return (
        <div className='home-container'>
          <h1 className='my-math'>MyMath</h1>
          <p className='welcome-msg'>Welcome to MyMath!</p>
          <Link className="to-exercise" to="/exercise">Let's Start Learning!</Link>
        </div>
      );

};
