const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    ID: Number,
    innings: Number,
    overs: Number,
    ballnumber: Number,
    batter: String,
    bowler: String,
    non_striker: String,
    extra_type: String,
    batsman_run: Number,
    extras_run: Number,
    total_run: Number,
    non_boundary: Number,
    isWicketDelivery: Boolean, 
    player_out: String,
    kind: String,
    fielders_involved: String,
    BattingTeam: String
});
module.exports = mongoose.model('Match', matchSchema);
