import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';
import { LoginForm } from '../components/LoginForm';
//stickers:
import pencil from '../assets/stickers/pencil.png';
import pencilCase from '../assets/stickers/pencil-case.png'; 
import apple from '../assets/stickers/apple.png'; 
import backpack from '../assets/stickers/backpack.png'; 
import calculator from '../assets/stickers/calculator.png'; 
import ruler from '../assets/stickers/ruler.png';  

const stickers = [
  { src: pencil, position: "top-left" },
  { src: pencilCase, position: "top-right" },
  { src: apple, position: "middle-left" },
  { src: backpack, position: "middle-right" },
  { src: calculator, position: "bottom-left" },
  { src: ruler, position: "bottom-right" },
];

export const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleLoginSubmit = (userName: string, password: string) => {
    if (!userName.trim() || !password.trim()) {
      console.error("Username and password cannot be empty.");
    } else {
      console.log("Username:", userName);
      console.log("Password:", password);
    }
    setPopupOpen(false);
  };

  return (
    <div className='home-container'>
      {stickers.map((sticker, index) => (
        <img key={index} src={sticker.src} alt={`Sticker ${index + 1}`} className={`sticker sticker-${sticker.position}`} />
      ))}
      <h1 className='my-math'>MyMath</h1>
      <p className='welcome-msg'>Welcome to MyMath!</p>
      <button className='open-login' onClick={() => setPopupOpen(true)}>Open Login</button>
      <LoginForm isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} onSubmit={handleLoginSubmit} />
      <Link className="to-exercise" to="/exercise">Let's Start Learning!</Link>
    </div>
  );
};

