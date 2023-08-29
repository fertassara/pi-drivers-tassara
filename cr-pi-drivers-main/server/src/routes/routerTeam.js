const express = require('express');
const router = express.Router();
const { Team } = require('../db');

// GET /teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching teams' });
  }
});

module.exports = router;
