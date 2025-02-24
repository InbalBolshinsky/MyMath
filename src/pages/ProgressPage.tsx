import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressPage.css';

interface ExerciseHistoryItem {
  date: string;
  time: string;
  difficulty: string;
  score: string;
  correct: number;
  incorrect: number;
}

interface Achievement {
  title: string;
  unlocked: boolean;
}

const trophyMap: { [key: string]: string } = {
  'First Exercise Completed': 'award-blue.png',
  '3 in a row': 'award-green.png',
  '5 in a row': 'award-purple.png',
  '7 in a row': 'award-pink.png',
  'High score above 10': 'award-red.png',
  'MyMath Master: collected all trophies': 'award-yellow.png'
};

const allTrophies = Object.keys(trophyMap);

const ProgressPage: React.FC = () => {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [highScore, setHighScore] = useState<number>(0);
  const [filter, setFilter] = useState('all');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/progress", { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        console.log("Progress data received:", data);
        setExerciseHistory(data.exerciseHistory || []);

        const normalizedAchievements = allTrophies.map(trophyName => ({
          title: trophyName,
          unlocked: data.achievements.includes(trophyName)
        }));

        setAchievements(normalizedAchievements);
        setHighScore(data.highScore || 0);
      })
      .catch((error) => console.error("Error fetching progress data:", error));
  }, []);

  
  return (
    <div className="progress-page-container">
      <h2 className="page-title">Progress Page</h2>

      <section className="exercise-history-section">
        <h3 className="section-title">Exercise History</h3>

        <div className="filter-container">
          <label htmlFor="filter" className="filter-label">Filter by Difficulty:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <p className="highscore-label">High score: {highScore}</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {exerciseHistory
              .filter((item) => filter === 'all' || item.difficulty.toLowerCase() === filter)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.difficulty}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="achievements-section">
  <h3 className="section-title">Achievements</h3>
  <div className="trophy-container">
    {allTrophies.map((trophyName, index) => {
      const isUnlocked = achievements.some(
        (achievement) => achievement.title === trophyName && achievement.unlocked
      );

      console.log(`Trophy: ${trophyName} | Unlocked: ${isUnlocked}`); 

      const trophyStyle =
        trophyName === "MyMath Master: collected all trophies"
          ? { marginLeft: "4%" }
          : {};

      return (
        <div
          key={index}
          className={`trophy ${isUnlocked ? "unlocked" : "locked"}`}
          style={trophyStyle}
        >
          <img src={`/trophies/${trophyMap[trophyName]}`} alt={trophyName} />
          <p className="trophy-name">{trophyName}</p>
        </div>
      );
    })}
  </div>
</section>


      <button className="go-back-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default ProgressPage;
