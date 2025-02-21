import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Exercise.css';
import { EndSessionForm } from '../components/EndSessionForm'; 

interface ExerciseState {
  difficulty: string;
  timer: number;
}

export const Exercise = () => {
  const location = useLocation();
  const { difficulty, timer } = (location.state as ExerciseState) || { difficulty: "easy", timer: 600 };
  const activityArr = ['+', '-', 'x', ':'];

  const [exercise, setExercise] = useState({
    activity: '',
    first_num: 0,
    second_num: 0
  });

  const [userInputAnswer, setUserInputAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10); // Set the timer
  const [score, setScore] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [isAnswerChecked, setIsAnswerChecked] = useState(false); 
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!timerStarted) return;
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setPopupOpen(true);  
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted, score]);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function generateExercise() {
    if (!timerStarted) setTimerStarted(true);

    const randomIndex = Math.floor(Math.random() * activityArr.length);
    const first_num = Math.floor(Math.random() * 101);
    const second_num = Math.floor(Math.random() * 101);

    setExercise({
      activity: activityArr[randomIndex],
      first_num,
      second_num
    });

    const correctAns = calcSolution(first_num, second_num, activityArr[randomIndex]);
    setCorrectAnswer(correctAns);
    setIsCorrect(null);
    setErrorMessage(null);
    setIsAnswerChecked(false); 
  }

  function calcSolution(first_num: number, second_num: number, activity: string) {
    switch (activity) {
      case '+': return first_num + second_num;
      case '-': return first_num - second_num;
      case 'x': return first_num * second_num;
      case ':': return second_num !== 0 ? first_num / second_num : NaN;
      default: return NaN;
    }
  }

  const playSound = (soundFile: string) => {
    if (!isMuted) {  
      const audio = new Audio(soundFile);
      audio.volume = 1.0;
      audio.play().catch((error) => console.warn("Sound playback failed:", error));
    }
  };

  const checkAnswer = () => {
    if (isAnswerChecked) return; 

    setIsAnswerChecked(true); 

    const userAnswer = parseFloat(userInputAnswer);
    if (isNaN(userAnswer)) {
      setErrorMessage("Your answer should be a number.");
      setIsCorrect(null);
    } else if (correctAnswer !== null) {
      const correct = userAnswer === correctAnswer;
      setIsCorrect(correct);
      setErrorMessage(null);
      
      if (correct) {
        setScore(prevScore => prevScore + 1);
        playSound('/sounds/correct.mp3');
      } else {
        playSound('/sounds/wrong.mp3');
      }
    }
  };

  const toggleSound = () => {
    setIsMuted(prevState => !prevState);
  };

  const handleRestart = () => {
    setPopupOpen(false);   
    setScore(0);          
    setTimeLeft(timer);       
    setTimerStarted(false);
    setExercise({          
      activity: '',
      first_num: 0,
      second_num: 0
    });
    setUserInputAnswer(''); 
    setCorrectAnswer(null); 
    setIsCorrect(null);     
    setErrorMessage(null);  
  };

  return (
    <div className="exercise-container">
     <div className="status-bar">
      <div className="left-section">
      <div className="score">
            Score: {score}
        </div>
        <div className="timer">
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>
      <button onClick={toggleSound} className="mute-btn">
        {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
      </button>
    </div>


      {errorMessage && <p className="error-msg">{errorMessage}</p>}
      {isCorrect !== null && (
        <p className="solution-msg" style={{ color: isCorrect ? 'green' : 'red' }}>
          {isCorrect ? 'Well Done!' : `Incorrect answer. The correct answer is ${correctAnswer}`}
        </p>
      )}

      <button
        className="exercise-btn"
        onClick={generateExercise}
        style={{
          fontSize: exercise.first_num === 0 && exercise.second_num === 0 ? "45px" : "60px",
          width: exercise.first_num === 0 && exercise.second_num === 0 ? "500px" : "300px",
          height: exercise.first_num === 0 && exercise.second_num === 0 ? "120px" : "110px",
          paddingTop: exercise.first_num === 0 && exercise.second_num === 0 ? "15px" : "0px"
        }}
      >
        {exercise.first_num === 0 && exercise.second_num === 0
          ? "Click here to start"
          : `${exercise.first_num} ${exercise.activity} ${exercise.second_num}`}
      </button>

      <div className="prompt-container">
        <label className="whats-your-answer" htmlFor="answer">What's your answer?</label>
        <input
          type="text"
          id="answer"
          value={userInputAnswer}
          onChange={(e) => setUserInputAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
      </div>

      <button className="check-answer" onClick={checkAnswer} disabled={isAnswerChecked}>
        Check Answer
      </button>

      <Link to="/" className="back-link">Go Back</Link>

      <EndSessionForm 
        isOpen={isPopupOpen} 
        onRestart={handleRestart}  
        score={score} 
      />
    </div>
  );
};
