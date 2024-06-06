
const pointsConfig = {
    batting: {
        run: 1,
        boundary: 1,
        six: 2,
        bonus30: 4,
        bonus50: 8,
        bonus100: 16,
        duck: -2
    },
    bowling: {
        wicket: 25,
        lbwBowledBonus: 8,
        threeWickets: 4,
        fourWickets: 8,
        fiveWickets: 16,
        maiden: 12
    },
    fielding: {
        catch: 8,
        threeCatches: 4,
        stumping: 12,
        runOut: 6
    }
};

exports.calculatePoints = (playerData, matchStats) => {
    let points = 0;

    // Batting points
    if (matchStats.batter === playerData.Player) {
        points += matchStats.batsman_run * pointsConfig.batting.run;
        if (matchStats.batsman_run >= 30) points += pointsConfig.batting.bonus30;
        if (matchStats.batsman_run >= 50) points += pointsConfig.batting.bonus50;
        if (matchStats.batsman_run >= 100) points += pointsConfig.batting.bonus100;
        if (matchStats.batsman_run === 0 && !['ALL-ROUNDER', 'BOWLER'].includes(playerData.Role)) points += pointsConfig.batting.duck;

        // Check for boundaries and sixes
        if (matchStats.non_boundary === 1) points += pointsConfig.batting.boundary;
        if (matchStats.batsman_run === 6) points += pointsConfig.batting.six;
    }

    // Bowling points
    if (matchStats.bowler === playerData.Player) {
        points += pointsConfig.bowling.wicket; // Assuming 1 wicket
        if (['lbw', 'bowled'].includes(matchStats.kind)) points += pointsConfig.bowling.lbwBowledBonus;
    }

    // Fielding points
    if (matchStats.kind === 'caught' && matchStats.fielders_involved === playerData.Player) {
        points += pointsConfig.fielding.catch;
    }
    if (matchStats.kind === 'stumped' && matchStats.fielders_involved === playerData.Player) {
        points += pointsConfig.fielding.stumping;
    }
    if (matchStats.kind === 'run out' && matchStats.fielders_involved === playerData.Player) {
        points += pointsConfig.fielding.runOut;
    }

    return points;
};
