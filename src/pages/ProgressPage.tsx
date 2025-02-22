import React, { useState } from 'react';
import './ProgressPage.css';

const ProgressPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  // Mock data for exercise history and achievements
  const exerciseHistory = [
    { date: '2025-02-22', time: '14:30', difficulty: 'Easy', score: '8/10', correct: 8, incorrect: 2 },
    { date: '2025-02-21', time: '16:15', difficulty: 'Medium', score: '10/10', correct: 10, incorrect: 0 },
  ];

  const achievements = [
    { title: 'First 5 correct answers!', unlocked: true },
    { title: 'Completed 10 exercises!', unlocked: false },
    { title: 'Perfect score on a hard question!', unlocked: false },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">📖 Progress Page</h2>

      {/* Exercise History Section */}
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
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Difficulty</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            {exerciseHistory
              .filter((item) => filter === 'all' || item.difficulty.toLowerCase() === filter)
              .map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.time}</td>
                  <td className="border p-2">{item.difficulty}</td>
                  <td className="border p-2">{item.score}</td>
                  <td className="border p-2">
                    {'✔️'.repeat(item.correct)}{'❌'.repeat(item.incorrect)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {/* Achievements Section */}
      <section>
        <h3 className="text-xl mb-2">⿢ Achievements</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${achievement.unlocked ? 'bg-green-200' : 'bg-gray-200'}`}
            >
              {achievement.unlocked ? '🏆' : '🔒'} {achievement.title}
            </div>
          ))}
        </div>

        <div className="mb-2">Progress to Next Achievement:</div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
