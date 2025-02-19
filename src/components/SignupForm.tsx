import React, { useState } from "react";
import'./SignupForm.css'

interface SignupFormProps {
    onSubmit: (userName: string, password: string) => void;
    isOpen: boolean;
    onClose: () => void;
  }

export const SignupForm: React.FC<SignupFormProps>  = ({ onSubmit, isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(userName, password);
  }

  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() =>
              alert("Is it your first time in MyMath? Sign Up here!")
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

