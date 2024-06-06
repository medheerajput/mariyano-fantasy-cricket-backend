const { errors } = require('../../utils/errors');
const { success } = require('../../utils/success');
const Team = require('../../models/Team');
const Player = require('../../models/Player');

// Define roles and teams
const roles = ['WICKETKEEPER', 'BATTER', 'ALL-ROUNDER', 'BOWLER'];
const teams = ['Rajasthan Royals', 'Chennai Super Kings'];

exports.addTeam = async (req, res) => {
    try {
        const { teamName, players, captain, viceCaptain } = req.body;

        // Validate team composition
        if (players.length !== 11) {
            return res.status(errors.invalidTeamComposition.status).json(errors.invalidTeamComposition);
        }

        const playerDocs = await Player.find({ Player: { $in: players } });

        const playerNames = playerDocs.map(p => p.Player);
        const invalidNames = players.filter(selectedPlayer => !playerNames.includes(selectedPlayer));

        if (invalidNames.length > 0) {
            return res.status(errors.invalidPlayerNames(invalidNames.join(', ')).status).json(errors.invalidPlayerNames(invalidNames.join(', ')));
        }

        const playerTeamCount = {};
        const playerRoleCount = {};

        for (const player of playerDocs) {
            const { Team, Role } = player;
            if (!teams.includes(Team)) {
                return res.status(errors.invalidPlayerTeam(player.Player, Team).status).json(errors.invalidPlayerTeam(player.Player, Team));
            }

            if (!roles.includes(Role)) {
                return res.status(errors.invalidPlayerRole(player.Player, Role).status).json(errors.invalidPlayerRole(player.Player, Role));
            }

            playerTeamCount[Team] = (playerTeamCount[Team] || 0) + 1;
            playerRoleCount[Role] = (playerRoleCount[Role] || 0) + 1;
        }

        // Check for maximum players from any one team
        if (Object.values(playerTeamCount).some(count => count > 10)) {
            return res.status(errors.maxPlayersFromTeam.status).json(errors.maxPlayersFromTeam);
        }

        // Check for minimum and maximum players in each role
        for (const role of roles) {
            const count = playerRoleCount[role] || 0;
            if (count < 1 || count > 8) {
                return res.status(errors.invalidPlayersForRole(role, count).status).json(errors.invalidPlayersForRole(role, count));
            }
        }

        // Ensure captain and vice-captain are part of the team
        if (!players.includes(captain)) {
            return res.status(errors.captainNotInTeam.status).json(errors.captainNotInTeam);
        }
        
        if (!players.includes(viceCaptain)) {
            return res.status(errors.viceCaptainNotInTeam.status).json(errors.viceCaptainNotInTeam);
        }

        const newTeam = new Team({ teamName, players, captain, viceCaptain });
        await newTeam.save();

        res.status(success.created().status).json(success.created('Team added successfully'));
    } catch (error) {
        res.status(errors.genericError.status).json(errors.genericError);
    }
};
