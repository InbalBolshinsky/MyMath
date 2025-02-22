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
  const { difficulty, timer } = (location.state as ExerciseState) || { difficulty: 'easy', timer: 600 };

  const [exercise, setExercise] = useState({
    activity: '',
    first_num: 0,
    second_num: 0,
    question: '',
    answer: 0
  });

  const [userInputAnswer, setUserInputAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [score, setScore] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const operationLevels: Record<'easy' | 'medium' | 'hard', string[]> = {
    easy: ['+', '-'],
    medium: ['+', '-', 'x', ':'],
    hard: ['+', '-', 'x', ':']
  };

  useEffect(() => {
    if (!timerStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
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

  function generateExercise() {
    if (!timerStarted) setTimerStarted(true);

    let question = '';
    let answer = 0;
    let first_num = 0;
    let second_num = 0;
    let activity = '';
    const allowedOperations = operationLevels[difficulty as 'easy' | 'medium' | 'hard'];

    do {
      first_num = Math.floor(Math.random() * 101);
      second_num = Math.floor(Math.random() * 101);
      activity = allowedOperations[Math.floor(Math.random() * allowedOperations.length)];

      answer =
        activity === '+' ? first_num + second_num :
        activity === '-' ? first_num - second_num :
        activity === 'x' ? first_num * second_num :
        second_num !== 0 ? first_num / second_num : 0;

    } while (
      answer < 0 ||
      (difficulty === 'medium' && activity === ':' && first_num % second_num !== 0)
    );

    question = `${first_num} ${activity} ${second_num}`;

    setExercise({ activity, first_num, second_num, question, answer });
    setIsCorrect(null);
    setErrorMessage(null);
    setIsAnswerChecked(false);
    setUserInputAnswer('');
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

  const handleCorrectAnswer = () => {
    setScore(prevScore => prevScore + 1);
    playSound('./sounds/correct.mp3');
  };

  const handleWrongAnswer = () => {
    playSound('./sounds/wrong.mp3');
  };

  const checkAnswer = () => {
    if (isAnswerChecked) return;
    setIsAnswerChecked(true);
    const userAnswer = parseFloat(userInputAnswer);
    if (isNaN(userAnswer)) {
      setErrorMessage('Your answer should be a number.');
      setIsCorrect(null);
    } else {
      const correct = userAnswer === exercise.answer;
      setIsCorrect(correct);
      setErrorMessage(null);
      if (correct) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer();
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
      second_num: 0,
      question: '',
      answer: 0
    });
    setUserInputAnswer('');
    setIsCorrect(null);
    setErrorMessage(null);
  };

  return (
    <div className='exercise-container'>
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
    
      {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      {isCorrect !== null && (
        <p className='solution-msg' style={{ color: isCorrect ? 'green' : 'red' }}>
          {isCorrect ? 'Well Done!' : `Incorrect answer. The correct answer is ${exercise.answer}`}
        </p>
      )}

      <button className='exercise-btn' onClick={generateExercise}>
        {exercise.question || 'Click here to start'}
      </button>

      <div className='prompt-container'>
        <label className='whats-your-answer' htmlFor='answer'>What's your answer?</label>
        <input
          type='text'
          id='answer'
          value={userInputAnswer}
          onChange={(e) => setUserInputAnswer(e.target.value)}
          placeholder='Enter your answer'
        />
      </div>

      <button className='check-answer' onClick={checkAnswer} disabled={isAnswerChecked}>
        Check Answer
      </button>

      <Link to='/' className='back-link'>Go Back</Link>

      <EndSessionForm isOpen={isPopupOpen} score={score} onRestart={handleRestart} />
    </div>
  );
};