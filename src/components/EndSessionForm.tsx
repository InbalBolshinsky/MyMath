import React from 'react';
import './PopupForm.css';

interface EndSessionFormProps {
  isOpen: boolean;
  onRestart: () => void;
  score: number;
}

export const EndSessionForm: React.FC<EndSessionFormProps> = ({ isOpen, onRestart, score }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="popup-close-button" onClick={onRestart}>✖</button>
        <h2>Session Over</h2>
        <p>You scored {score} points!</p>
        <button className="restart-btn" onClick={onRestart}>Try Again</button>
      </div>
    </div>
  );
};
