import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./PopupForm.css";

interface SessionSettingsFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (settings: { difficulty: string; timer: number }) => void;
}

const difficultyLevels = ["Easy", "Medium", "Hard"];

export const SessionSettingsForm: React.FC<SessionSettingsFormProps> = ({ isOpen, onClose }) => {
    const [difficulty, setDifficulty] = useState<number>(0);
    const [timer, setTimer] = useState<number>(600); 
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleStartSession = () => {
        const settings = { difficulty: difficultyLevels[difficulty].toLowerCase(), timer };
        console.log("Session Settings:", settings);
        navigate("/exercise", { state: { difficulty: difficultyLevels[difficulty].toLowerCase(), timer } });
        onClose();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onClose}>✖</button>
                
                <h2 className="settings-header">Session Settings</h2>
                
                <div className="settings-field">
                    <label>Exercise Difficulty:</label>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={difficulty}
                        onChange={(e) => setDifficulty(parseInt(e.target.value))}
                        className="custom-slider"
                    />
                    <div className="difficulty">{difficultyLevels[difficulty]}</div>
                </div>

                <div className="settings-field">
                    <label>Timer (Minutes):</label>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={timer / 60}
                        onChange={(e) => setTimer(parseFloat(e.target.value) * 60)}
                        className="custom-slider"
                   />
                    <div className="time">{(timer / 60).toFixed(1)} minutes</div>
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

export default SessionSettingsForm;
