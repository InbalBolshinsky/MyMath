import React, { useState } from "react";
import './Home.css';
import { LoginForm } from '../components/LoginForm';
import { SessionSettingsForm } from '../components/SessionSettingsForm'; 

const stickers = [
  { src: '/stickers/pencil.png', position: 'top-left' },
  { src: '/stickers/pencil-case.png', position: 'top-right' },
  { src: '/stickers/apple.png', position: 'middle-left' },
  { src: '/stickers/backpack.png', position: 'middle-right' },
  { src: '/stickers/calculator.png', position: 'bottom-left' },
  { src: '/stickers/ruler.png', position: 'bottom-right' },
];

export const Home = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSessionSettingsPopupOpen, setSessionSettingsPopupOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleLoginSubmit = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setWelcomeMessage(data.message); 
        alert(data.message); 
        setLoginPopupOpen(false); 
      } else {
        setWelcomeMessage(data.error); 
        alert(data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setWelcomeMessage("Server error. Please try again later.");
    }
  };

  const handleSignUpSubmit = async (username: string, password: string) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();

        if (response.ok) {
            alert(data.message); // "Signed up successfully!"
            setLoginPopupOpen(false); // Optionally close the modal
        } else {
            alert(data.error); // Display any sign-up errors
        }
    } catch (error) {
        console.error("Sign-Up Error:", error);
        alert("Server error. Please try again later.");
    }
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
