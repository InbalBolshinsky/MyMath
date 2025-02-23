import React, { useState } from "react";
import "./PopupForm.css";

interface LoginFormProps {
  onSuccess: (username: string) => void;
  onClose: () => void;
  onSignUpClick: () => void; 
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onClose,
  onSignUpClick,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(userName); // Notify Home.tsx of successful login
        setErrorMessage("");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Server error. Please try again later.");
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="login-header">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={onSignUpClick}>
            Sign Up
          </button>

          {errorMessage && (
            <p className="error-text">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
