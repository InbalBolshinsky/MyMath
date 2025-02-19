import React, { useState } from "react";
import "./LoginForm.css";
import { SignUpForm } from "./SignupForm"; 

interface LoginFormProps {
  onSubmit: (userName: string, password: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); 

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(userName, password);
  }

  if (!isOpen) return null;

  return isSignUp ? (
    <SignUpForm onSubmit={onSubmit} onBack={() => setIsSignUp(false)} />
  ) : (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onClose}>✖</button>
        <form onSubmit={handleSubmit}>
          <h2 className="login-header">Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => setIsSignUp(true)}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};
