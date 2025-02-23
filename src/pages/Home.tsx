import React, { useState } from "react";
import './Home.css';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignupForm';
import { SessionSettingsForm } from '../components/SessionSettingsForm'; 
import { useNavigate } from "react-router-dom";

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
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [isSessionSettingsPopupOpen, setSessionSettingsPopupOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to MyMath!");

  const navigate = useNavigate();

  const handleLoginSuccess = (username: string) => {
    setWelcomeMessage(`Welcome back, ${username}!`);
    setLoginPopupOpen(false);
  };

  return (
    <div className='home-container'>
      {stickers.map((sticker, index) => (
        <img key={index} src={sticker.src} alt={`Sticker ${index + 1}`} className={`sticker sticker-${sticker.position}`} />
      ))}

      <h1 className='my-math'>MyMath</h1>
      <p className='welcome-msg'>{welcomeMessage}</p>
      
      <button className='open-login' onClick={() => setLoginPopupOpen(true)}>
        Login
      </button>
      
      <button className='open-session-settings' onClick={() => setSessionSettingsPopupOpen(true)}>
        Let's Start Learning!
      </button>

      <button className='view-progress' onClick={() => navigate('/progress')}>
        To Progress Page
      </button>

      {/* Login Form Popup */}
      {isLoginPopupOpen && (
        <div className="modal-overlay" onClick={() => setLoginPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onClose={() => setLoginPopupOpen(false)} 
              onSignUpClick={() => {
                setLoginPopupOpen(false);
                setSignUpPopupOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Sign-Up Form Popup */}
      {isSignUpPopupOpen && (
        <div className="modal-overlay" onClick={() => setSignUpPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SignUpForm 
              onSuccess={() => setSignUpPopupOpen(false)} 
              onBack={() => setSignUpPopupOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Session Settings Form Popup */}
      {isSessionSettingsPopupOpen && (
        <div className="modal-overlay" onClick={() => setSessionSettingsPopupOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SessionSettingsForm 
              isOpen={isSessionSettingsPopupOpen} 
              onClose={() => setSessionSettingsPopupOpen(false)} 
              onSubmit={() => setSessionSettingsPopupOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
