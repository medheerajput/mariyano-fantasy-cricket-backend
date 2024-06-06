const express = require('express');
const router = express.Router();
const resultController = require('./resultController');

router.post('/process-result', resultController.processResult);
router.get('/team-result', resultController.getTeamResults);

module.exports = router;
