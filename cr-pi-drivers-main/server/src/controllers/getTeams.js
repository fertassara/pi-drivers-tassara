const axios = require('axios');
const { Team } = require('../db');

const getTeams = async (req, res) => {
  try {
    // Realiza una solicitud GET a la API
    const response = await axios.get('http://localhost:5000/drivers');

    // Extrae los equipos de la respuesta de la API
    const teamsFromAPI = response.data.map(driver => driver.team);

    // Inserta los equipos en la base de datos si no existen
    await Team.bulkCreate(
      teamsFromAPI.map(name => ({ name })),
      { ignoreDuplicates: true }
    );

    // Obtiene todos los equipos de la base de datos
    const teamsFromDB = await Team.findAll();

    // Envía la lista de equipos como respuesta
    res.json(teamsFromDB);
  } catch (error) {
    console.error('Error al obtener los equipos:', error.message);
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
};

module.exports = { getTeams };
