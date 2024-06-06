exports.errors = {
    invalidTeamComposition: {
        status: 400,
        message: 'Invalid team composition. A team must have exactly 11 players.'
    },
    invalidPlayerNames: (names) => ({
        status: 400,
        message: `Invalid player names: ${names}`
    }),
    invalidPlayerTeam: (player, team) => ({
        status: 400,
        message: `Player ${player} belongs to an invalid team: ${team}`
    }),
    invalidPlayerRole: (player, role) => ({
        status: 400,
        message: `Player ${player} has an invalid role: ${role}`
    }),
    maxPlayersFromTeam: {
        status: 400,
        message: 'A team cannot have more than 10 players from the same team.'
    },
    invalidPlayersForRole: (role, count) => ({
        status: 400,
        message: `Invalid number of players for role ${role}. Current count: ${count}`
    }),
    captainNotInTeam: {
        status: 400,
        message: 'Captain must be a part of the team.'
    },
    viceCaptainNotInTeam: {
        status: 400,
        message: 'Vice-captain must be a part of the team.'
    },
    genericError: {
        status: 400,
        message: 'An error occurred. Please try again.'
    },
    calculatingPointsError: (teamName) => ({
        status: 500,
        message: `Error calculating points for team ${teamName}`
    })
};
