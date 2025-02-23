import React, { useState } from "react";
import "./PopupForm.css";
import { SignUpForm } from "./SignupForm";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

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
        setMessage(data.message);
        alert(data.message); // "Welcome back, {username}!"
        // Optional: Redirect to another page or close the modal
        onClose();
      } else {
        setMessage(data.error); // "Invalid username or password"
        alert(data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Server error. Please try again later.");
    }
  }

  if (!isOpen) return null;

  return isSignUp ? (
    <SignUpForm
    onSubmit={async (userName, password) => {
    setMessage("Signed up successfully!");
    alert("Signed up successfully!"); 
    setIsSignUp(false); // Switch back to login form
  }}
  onBack={() => setIsSignUp(false)}
/>

  ) : (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onClose}>
          ✖
        </button>
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
          <button type="button" onClick={() => setIsSignUp(true)}>
            Sign Up
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};
