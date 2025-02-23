import React, { useState, useEffect } from 'react';
import './ProgressPage.css';

interface ExerciseHistoryItem {
  date: string;
  time: string;
  difficulty: string;
  score: string;
}

const ProgressPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');

  const username = "testuser"; 

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/progress/${username}`);
        const data = await response.json();

        if (response.ok) {
          setExerciseHistory(data.exerciseHistory || []);
          setAchievements(data.achievements || []);
        } else {
          setError(data.error || 'Failed to fetch progress data.');
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
        setError('Server error. Please try again later.');
      }
    };

    fetchProgressData();
  }, [username]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">📖 Progress Page</h2>

      {error && <p className="text-red-500">{error}</p>}

      <section className="mb-8">
        <h3 className="text-xl mb-2">⿡ Exercise History</h3>

        <div className="mb-4">
          <label htmlFor="filter" className="mr-2">Filter by Difficulty:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <table className="w-full border">
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
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3 className="text-xl mb-2">⿢ Achievements</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-4 border rounded-lg bg-green-200">
              🏆 {achievement}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
