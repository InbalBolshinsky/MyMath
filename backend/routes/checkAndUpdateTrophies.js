const checkAndUpdateTrophies = async (user) => {
    console.log('Evaluating achievements for user:', user.username);
    console.log('User exercise history:', user.exerciseHistory);

    // 1. Achievement: "First Exercise Completed"
    if (user.exerciseHistory.length >= 1 && !user.trophies.includes('First Exercise Completed')) {
        user.trophies.push('First Exercise Completed');
    }

    const latestSession = user.exerciseHistory[user.exerciseHistory.length - 1];
    if (latestSession) {
        console.log('Latest session data:', latestSession);
        const correct = parseInt(latestSession.correct, 10) || 0;
        const incorrect = parseInt(latestSession.incorrect, 10) || 0;
        const sessionScore = parseInt(latestSession.score, 10) || 0;

        if (sessionScore > (user.highScore || 0)) {
            user.highScore = sessionScore;
        }

        // 2. Achievement: "3 in a row"
        if (correct >= 3 && !user.trophies.includes('3 in a row')) {
            user.trophies.push('3 in a row');
        }

        // 3. Achievement: "5 in a row"
        if (correct >= 5 && !user.trophies.includes('5 in a row')) {
            user.trophies.push('5 in a row');
        }

        // 4. Achievement: "7 in a row"
        if (correct >= 7 && !user.trophies.includes('7 in a row')) {
            user.trophies.push('7 in a row');
        }

        // 5. Achievement: "High score above 10"
        if (sessionScore >= 10 && !user.trophies.includes('High score above 10')) {
            user.trophies.push('High score above 10');
        }
    }

    // 6. Achievement: "MyMath Master: collected all trophies"
    const requiredTrophies = [
        'First Exercise Completed',
        '3 in a row',
        '5 in a row',
        '7 in a row',
        'High score above 10'
    ];

    const hasAll = requiredTrophies.every(trophy => user.trophies.includes(trophy));
    if (hasAll && !user.trophies.includes('MyMath Master: collected all trophies')) {
        user.trophies.push('MyMath Master: collected all trophies');
    }

    await user.save();
    console.log('Updated user trophies:', user.trophies);
};

module.exports = { checkAndUpdateTrophies };
