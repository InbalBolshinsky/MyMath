import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);


  const operationLevels: Record<'easy' | 'medium' | 'hard', string[]> = {
    easy: ['+', '-'],
    medium: ['+', '-', 'x', ':'],
    hard: ['+', '-', 'x', ':']
  };

  const submitSessionData = async () => {
    try {
        const sessionData = {
            difficulty, 
            score, 
            correct: correctAnswers, 
            incorrect: incorrectAnswers,
            duration: Math.floor((timer - timeLeft) / 60)
        };

        const response = await axios.post(
            'http://localhost:5000/api/progress/update-session',
            sessionData,
            { withCredentials: true }
        );
        console.log('Session data saved:', response.data);
        console.log('High Score received:', response.data.highScore);
    } catch (error) {
        console.error('Error saving session data:', error);
    }
};


  useEffect(() => {
    if (!timerStarted) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          setPopupOpen(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timerStarted]);

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
    setCorrectAnswers(prev => prev + 1); 
    playSound('../public/sounds/correct.mp3'); 
};

const handleWrongAnswer = () => {
    setIncorrectAnswers(prev => prev + 1); 
    playSound('../public/sounds/wrong.mp3');
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
    setCorrectAnswers(0); 
    setIncorrectAnswers(0); 
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
          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
          {isCorrect !== null && (
            <p className='solution-msg' style={{ color: isCorrect ? 'green' : 'red', marginLeft: isCorrect ? '200px' : '0px' }}>
              {isCorrect ? 'Well Done!' : `Incorrect answer. The correct answer is ${exercise.answer}`}
            </p>
          )}
        </div>
        <button onClick={toggleSound} className="mute-btn">
          {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
        </button>
      </div>
      <div>
        <p className='exercise-click'>Click here for the next exercise {'->'}</p>
        <button 
          className='exercise-btn' 
          onClick={generateExercise}
          style={{
            fontSize: exercise.question ? '70px' : '50px',
          }}>
          {exercise.question || 'Click here to start'}
        </button>
      </div>
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

      {/* Pass a combined function to EndSessionForm: first submit session data, then restart */}
      <EndSessionForm 
        isOpen={isPopupOpen} 
        score={score} 
        onRestart={async () => {
          await submitSessionData();
          handleRestart();
        }} 
      />
    </div>
  );
};
