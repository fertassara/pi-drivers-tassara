const express = require('express');
const { Sequelize } = require('sequelize'); 
const router = express.Router();
const { Driver , Team} = require('../db');
const { getDrivers } = require('../controllers/getDrivers')
const { getDriversId } = require('../controllers/getDriversId')
const { getDriversName } = require('../controllers/getDriversName');
const { postDrivers } = require('../controllers/postDrivers');
const { getTeams } = require ('../controllers/getTeams')

router.get('/', getDrivers);
router.get('/teams, getTeams');
router.get('/name', getDriversName);
router.get('/:idDriver', getDriversId); 
router.post('/', postDrivers);

module.exports = router;
