const express = require('express');
const { Sequelize } = require('sequelize'); 
const router = express.Router();
const { Driver, Team } = require('../db');

// GET /drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: Team,
    });
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching drivers' });
  }
});

// GET /drivers/:idDriver
router.get('/:idDriver', async (req, res) => {
  const idDriver = req.params.idDriver;
  try {
    const driver = await Driver.findByPk(idDriver, {
      include: Team,
    });
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching driver details' });
  }
});

// GET /drivers/name?="..."
router.get('/name', async (req, res) => {
  const searchQuery = req.query.q;
  try {
    const drivers = await Driver.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${searchQuery}%`,
        },
      },
      limit: 15,
    });
    if (drivers.length > 0) {
      res.json(drivers);
    } else {
      res.json({ message: 'No drivers found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while searching for drivers' });
  }
});

// POST /drivers
router.post('/', async (req, res) => {
    const { name, teams, image } = req.body;
  
    // Si no se proporciona una imagen, establecer una por defecto
    const defaultImage = 'https://picsum.photos/700/400?random';
  
    try {
      const newDriver = await Driver.create({ name, image: image || defaultImage });
  
      if (teams && teams.length > 0) {
        await newDriver.addTeams(teams);
      }
  
      res.status(201).json(newDriver);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating driver' });
    }
  });
  
module.exports = router;