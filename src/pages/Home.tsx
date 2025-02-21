import React, { useState } from "react";
import './Home.css';
import { LoginForm } from '../components/LoginForm';
import { SessionSettingsForm } from '../components/SessionSettingsForm';

// stickers:
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
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSessionSettingsPopupOpen, setSessionSettingsPopupOpen] = useState(false);

  const handleLoginSubmit = (userName: string, password: string) => {
    console.log("Username:", userName, "Password:", password);
    setLoginPopupOpen(false);
  };

  const handleSessionSettingsSubmit = (settings: any) => {
    console.log("Session settings:", settings);
    setSessionSettingsPopupOpen(false);
  };

  return (
    <div className='home-container'>
      {stickers.map((sticker, index) => (
        <img key={index} src={sticker.src} alt={`Sticker ${index + 1}`} className={`sticker sticker-${sticker.position}`} />
      ))}
      <h1 className='my-math'>MyMath</h1>
      <p className='welcome-msg'>Welcome to MyMath!</p>
      
      <button className='open-login' onClick={() => setLoginPopupOpen(true)}>
        Open Login
      </button>
      
      <button className='open-session-settings' onClick={() => setSessionSettingsPopupOpen(true)}>
        Let's Start Learning!
      </button>
      
      {isLoginPopupOpen && (
        <div className="modal-overlay" onClick={() => setLoginPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LoginForm 
              isOpen={isLoginPopupOpen} 
              onClose={() => setLoginPopupOpen(false)} 
              onSubmit={handleLoginSubmit} 
            />
          </div>
        </div>
      )}

      {isSessionSettingsPopupOpen && (
        <div className="modal-overlay" onClick={() => setSessionSettingsPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SessionSettingsForm 
              isOpen={isSessionSettingsPopupOpen} 
              onClose={() => setSessionSettingsPopupOpen(false)} 
              onSubmit={handleSessionSettingsSubmit} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
