import React, { useState } from "react";
import "./PopupForm.css";

interface SignUpFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onBack,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        setSuccessMessage("Signed up successfully! Please log in.");
        setErrorMessage("");
        setTimeout(() => {
          onSuccess(); 
        }, 2000);
      } else {
        setErrorMessage(data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Sign-Up Error:", error);
      setErrorMessage("Server error. Please try again later.");
      setSuccessMessage("");
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
          <input
          className="input"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">Sign Up</button>
          <button className="go-back-btn" type="button" onClick={onBack}>
            Back to Login
          </button>

          {errorMessage && (
            <div className="error-popup">
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="success-popup">
              <p>{successMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
