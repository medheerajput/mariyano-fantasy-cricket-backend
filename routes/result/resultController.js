const { errors } = require('../../utils/errors');
const { success } = require('../../utils/success');
const Team = require('../../models/Team');
const Match = require('../../models/Match');
const Player = require('../../models/Player');
const { calculatePoints } = require("./calculatePoints");

// processing to result
exports.processResult = async (req, res) => {
    try {
        const matchData = await Match.find({});
        const players = await Player.find({});
        const teams = await Team.find({});

        teams.forEach(team => {
            let totalPoints = 0;
            const playerPoints = {};
            try {
                team.players.forEach(player => {
                    const playerData = players.find(p => p.Player === player);
                    let points = 0;

                    matchData.forEach(match => {
                        points += calculatePoints(playerData, match);
                    });
                    
                    // Apply captain and vice-captain multipliers
                    if (player === team.captain) points *= 2;
                    if (player === team.viceCaptain) points *= 1.5;
    
                    playerPoints[player] = points;
                    totalPoints += points;
                });
            } catch (error) {
                const errorMessage = errors.calculatingPointsError(team.name);
                res.status(errorMessage.status).send(errorMessage);
                return;
            }

            team.points = totalPoints;
            team.save();
        });

        res.status(success.matchResultProcessed.status).send(success.matchResultProcessed);
    } catch (error) {
        res.status(errors.genericError.status).send(errors.genericError);
    }
};

// to get winner team
exports.getTeamResults = async (req, res) => {
    try {
        const teams = await Team.findOne().sort({ points : -1 });
        res.status(success.ok().status).json({ [success.winnersTeam]: teams });
    } catch (error) {
        res.status(errors.genericError.status).send(errors.genericError);
    }
};

