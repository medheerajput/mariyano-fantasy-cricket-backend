const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    Player: String,
    Team: String,
    Role: String
});

module.exports = mongoose.model('Player', playerSchema);
