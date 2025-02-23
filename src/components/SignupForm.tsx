import React, { useState } from "react";
import "./PopupForm.css";

interface SignUpFormProps {
  onSubmit: (userName: string, password: string) => Promise<void>;
  onBack: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onBack }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // "Signed up successfully!"
        alert(data.message);
        await onSubmit(userName, password); // Call parent onSubmit
        onBack(); // Go back to login form
      } else {
        setMessage(data.error); // "Username already exists"
        alert(data.error);
      }
    } catch (error) {
      console.error("Sign-Up Error:", error);
      setMessage("Server error. Please try again later.");
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onBack}>
          ✖
        </button>
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
          <button type="button" onClick={onBack}>
            Back to Login
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};
