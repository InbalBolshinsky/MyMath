import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Exercise.css';

export const Exercise = () => {
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
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!timerStarted) return;
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert(`Time is up! You scored ${score} points`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted, score]);

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

    // Calculate the correct answer
    const correctAns = calcSolution(first_num, second_num, activityArr[randomIndex]);
    setCorrectAnswer(correctAns);
    setIsCorrect(null);
    setErrorMessage(null);
  }

  function calcSolution(first_num: number, second_num: number, activity: string) {
    switch (activity) {
      case '+':
        return first_num + second_num;
      case '-':
        return first_num - second_num;
      case 'x':
        return first_num * second_num;
      case ':':
        return second_num !== 0 ? first_num / second_num : NaN;
      default:
        return NaN;
    }
  }

  const handleInputChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputAnswer(event.target.value);
  };

  const checkAnswer = () => {
    const userAnswer = parseFloat(userInputAnswer);
    if (isNaN(userAnswer)) {
      setErrorMessage("Your answer should be a number.");
      setIsCorrect(null);
    } else if (correctAnswer !== null) {
      const correct = userAnswer === correctAnswer;
      setIsCorrect(correct);
      setErrorMessage(null);
      if (correct) setScore(prevScore => prevScore + 1);
    }
  };

  return (
    <div className="exercise-container">
      <div className="status-bar" style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', fontSize: '20px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
        <span>Score: {score}</span>
        <span>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
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
          fontSize:
            exercise.first_num === 0 && exercise.second_num === 0 ? "40px" : "100px",
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
          onChange={handleInputChangeAnswer}
          placeholder="Enter your answer"
        />
      </div>

      <button className="check-answer" onClick={checkAnswer}>Check Answer</button>
      
      <Link to="/" className="back-link">Go Back</Link>
    </div>
  );
};
