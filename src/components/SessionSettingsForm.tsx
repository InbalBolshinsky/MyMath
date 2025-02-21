import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./PopupForm.css";

interface SessionSettingsFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (settings: { difficulty: string; timer: number }) => void;
}

export const SessionSettingsForm: React.FC<SessionSettingsFormProps> = ({ isOpen, onClose }) => {
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [timer, setTimer] = useState<number>(600); 
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleStartSession = () => {
        const settings = { difficulty, timer };
        console.log("Session Settings:", settings);
        // Pass timer value to the Exercise page
        navigate("/exercise", { state: { difficulty, timer } });
        onClose();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onClose}>✖</button>
                
                <h2 className="settings-header">Session Settings</h2>
                
                <div className="settings-field">
                    <label htmlFor="difficulty">Exercise Difficulty:</label>
                    <select 
                        id="difficulty" 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="settings-field">
                    <label htmlFor="timer">Timer (minutes):</label>
                    <input 
                        type="number" 
                        id="timer" 
                        value={timer / 60} // Display in minutes
                        min="1"
                        onChange={(e) => setTimer((parseInt(e.target.value) || 0) * 60)} 
                    />
                </div>

                <div className="button-group">
                    <button className="start-session-btn" onClick={handleStartSession}>
                        Start Session
                    </button>
                    <button className="go-back-btn" onClick={onClose}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};
