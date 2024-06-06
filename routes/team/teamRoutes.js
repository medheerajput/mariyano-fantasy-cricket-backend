const express = require('express');
const router = express.Router();
const teamController = require('./teamController');


// Your other routes
router.post('/add-team', teamController.addTeam);

module.exports = router;
