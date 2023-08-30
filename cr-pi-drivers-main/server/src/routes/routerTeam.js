const express = require('express');
const { Sequelize } = require('sequelize'); 
const router = express.Router();
const {Team , Driver} = require('../db');

// GET /teams trae todos los equipos
router.get('/', async (req, res) => {
  try {
    const team = await Team.findAll()
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching drivers' });
    }});

module.exports = router;

// const { Sequelize } = require('sequelize'); 
// const express = require('express');
// const fs = require('fs');
// const { Team, Driver } = require('../db'); 

// router.get('/teams', async (req, res) => {
//   try {
//     const teamsFromDatabase = await Team.findAll();

//     if (teamsFromDatabase.length === 0) {
//       const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
//       const teamsToSave = [];

//       // Recorre los pilotos del JSON para obtener los equipos y pilotos
//       jsonData.drivers.forEach(driver => {
//         const teams = driver.teams.split(', ');
        
//         teams.forEach(teamName => {
//           const existingTeam = teamsToSave.find(team => team.name === teamName);
          
//           if (!existingTeam) {
//             teamsToSave.push({ name: teamName, drivers: [driver] });
//           } else {
//             existingTeam.drivers.push(driver);
//           }
//         });
//       });

//       // Guarda los equipos en la base de datos
//       await Team.bulkCreate(teamsToSave);

//       const teams = await Team.findAll({ include: Driver });
//       res.json(teams);
//     } else {
//       res.json(teamsFromDatabase);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while fetching teams' });
//   }
// });

// module.exports = router;

