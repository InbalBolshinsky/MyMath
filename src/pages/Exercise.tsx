import React, { useState } from 'react';
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

  function generateExercise() {
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
    setIsCorrect(null); // Reset correctness when a new exercise is generated
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
        return second_num !== 0 ? first_num / second_num : NaN; // Avoid division by zero
      default:
        return NaN;
    }
  }

  const handleInputChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputAnswer(event.target.value);
  };

  const checkAnswer = () => {
    const userAnswer = parseFloat(userInputAnswer);
    if (!isNaN(userAnswer) && correctAnswer !== null) {
      setIsCorrect(userAnswer === correctAnswer);
    }
  };

  return (
    <div className="exercise-container">
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

      {isCorrect !== null && (
        <p className="solution-msg">{isCorrect ? 'Well Done!' : `Incorrect answer. The correct answer is ${correctAnswer}`}</p>
      )}
    </div>
  );
};