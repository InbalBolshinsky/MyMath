import React, { useState } from "react";
import "./PopupForm.css"; 

interface SignUpFormProps {
  onSubmit: (userName: string, password: string) => void;
  onBack: () => void; 
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onBack }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(userName, password);
  }

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onBack}>✖</button>
        <form onSubmit={handleSubmit}>
          <h2 className="signup-header">Sign Up</h2>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
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
          <button type="submit">Sign Up</button>
          <button type="button" onClick={onBack}>Back to Login</button>
        </form>
      </div>
    </div>
  );
};
