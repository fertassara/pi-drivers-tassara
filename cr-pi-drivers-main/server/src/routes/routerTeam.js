const express = require('express');
const router = express.Router();
const { getTeamsAndSaveToDatabase } = require('../controllers/getTeams'); // Importa el controlador correcto

router.get('/', getTeamsAndSaveToDatabase); // Asigna el controlador a la ruta

module.exports = router;
    