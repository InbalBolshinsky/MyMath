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
  const [errorPopup, setErrorPopup] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLoginSuccess = (username: string) => {
    setWelcomeMessage(`Welcome back, ${username}!`);
    setIsLoggedIn(true);
    setLoginPopupOpen(false);
  };

  const handleProgressClick = () => {
    if (isLoggedIn) {
      navigate('/progress');
    } else {
      setErrorPopup("You need to log in to see progress.");
    }
  };

  const closeErrorPopup = () => {
    setErrorPopup(null);
  };

  return (
    <div className='home-container'>
      {stickers.map((sticker, index) => (
        <img key={index} src={sticker.src} alt={`Sticker ${index + 1}`} className={`sticker sticker-${sticker.position}`} />
      ))}

      <h1 className='my-math'>MyMath</h1>
      <p className='welcome-msg'>{welcomeMessage}</p>
      
      <button className="button-pink" onClick={() => setLoginPopupOpen(true)}>
      Login
      </button>

    <button className="button-pink" onClick={() => setSessionSettingsPopupOpen(true)}>
      Let's Start Learning!
    </button>

    <button className="button-blue" onClick={handleProgressClick}>
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

      {/* Error Message Popup */}
      {errorPopup && (
        <div className="modal-overlay" onClick={closeErrorPopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="error">Error</h2>
            <p>{errorPopup}</p>
            <button className="error-button" onClick={closeErrorPopup}>
                Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
