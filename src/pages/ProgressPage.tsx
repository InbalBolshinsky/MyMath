import React, { useEffect, useState } from 'react';
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

const ProgressPage: React.FC = () => {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch data from the server (replace 'testuser' with the actual username if needed)
    fetch("http://localhost:5000/api/progress/testuser")
      .then((response) => response.json())
      .then((data) => {
        setExerciseHistory(data.exerciseHistory || []);
        setAchievements(data.achievements || []);
      })
      .catch((error) => console.error("Error fetching progress data:", error));
  }, []);

  return (
    <div className="progress-page-container">
      <h2 className="page-title">📖 Progress Page</h2>

      <section className="exercise-history-section">
        <h3 className="section-title">📝 Exercise History</h3>

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
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Performance</th>
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
                  <td>{'✔️'.repeat(item.correct)}{'❌'.repeat(item.incorrect)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="achievements-section">
        <h3 className="section-title">🏆 Achievements</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Achievement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((achievement, index) => (
              <tr key={index}>
                <td>{achievement.title}</td>
                <td>{achievement.unlocked ? "Unlocked 🎉" : "Locked 🔒"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ProgressPage;
