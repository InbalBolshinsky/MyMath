// helpers/trophyHelper.js
// This helper calculates and updates the user's trophies based on their exerciseHistory

const checkAndUpdateTrophies = async (user) => {
    // Achievement: "First Exercise Completed"
    if (user.exerciseHistory.length >= 1 && !user.trophies.includes('First Exercise Completed')) {
      user.trophies.push('First Exercise Completed');
      console.log('Achievement unlocked: First Exercise Completed');
    }
  
    // Get the latest session (assumes exerciseHistory is stored chronologically)
    const latestSession = user.exerciseHistory[user.exerciseHistory.length - 1];
    if (latestSession) {
      // Ensure numeric values for correct and score
      const correct = parseInt(latestSession.correct) || 0;
      const sessionScore = parseInt(latestSession.score) || 0;
      
      // Achievement: "3 in a row" (3 correct answers in a row in one session)
      if (correct >= 3 && !user.trophies.includes('3 in a row')) {
        user.trophies.push('3 in a row');
        console.log('Achievement unlocked: 3 in a row');
      }
      
      // Achievement: "5 in a row" (5 correct answers in a row in one session)
      if (correct >= 5 && !user.trophies.includes('5 in a row')) {
        user.trophies.push('5 in a row');
        console.log('Achievement unlocked: 5 in a row');
      }
      
      // Achievement: "5 correct answers in 5 mins"
      // Requires that the session duration (in minutes) is 5 or less and correct >= 5.
      if (latestSession.duration !== undefined &&
          parseFloat(latestSession.duration) <= 5 &&
          correct >= 5 &&
          !user.trophies.includes('5 correct answers in 5 mins')) {
        user.trophies.push('5 correct answers in 5 mins');
        console.log('Achievement unlocked: 5 correct answers in 5 mins');
      }
      
      // Achievement: "High score above 10"
      if (sessionScore > 10 && !user.trophies.includes('High score above 10')) {
        user.trophies.push('High score above 10');
        console.log('Achievement unlocked: High score above 10');
      }
    }
    
    // Achievement: "Master Problem Solver: collected all trophies"
    const requiredTrophies = [
      'First Exercise Completed',
      '3 in a row',
      '5 correct answers in 5 mins',
      '5 in a row',
      'High score above 10'
    ];
    const hasAll = requiredTrophies.every(t => user.trophies.includes(t));
    if (hasAll && !user.trophies.includes('MyMath Master: collected all trophies')) {
      user.trophies.push('Master Problem Solver: collected all trophies');
      console.log('Achievement unlocked: MyMath Master: collected all trophies');
    }
  
    await user.save();
  };
  
  module.exports = { checkAndUpdateTrophies };
  