const express = require('express');
const axios = require('axios');
const Team = require('../models/Team');
const router = express.Router();
const { getTeams } = require ('../controllers/getTeams')


router.get('/teams', getTeams);


module.exports = router;
