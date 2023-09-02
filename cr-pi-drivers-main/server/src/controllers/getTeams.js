const axios = require('axios');
const { Team } = require('../db'); // Importa el modelo de equipos de Sequelize

const getTeamsAndSaveToDatabase = async (req, res) => {
  try {
    // Verifica si la tabla de equipos está vacía
    const isEmpty = await Team.count() === 0;

    if (isEmpty) {
      // Si está vacía, obtén los equipos de la API
      const response = await axios.get('http://localhost:5000/drivers');
      const drivers = response.data;

      // Obtener todos los equipos de los conductores y dividirlos si no son undefined
      const teamsArray = drivers
        .map(driver => driver.teams)
        .filter(teams => teams !== undefined)
        .flat()
        .flatMap(name => name.split(','));

      // Fusionar todos los equipos en un solo array y eliminar undefined
      const mergedTeams = teamsArray.filter(name => name !== undefined);

      // Eliminar duplicados y espacios en blanco de la lista de equipos
      const uniqueTeams = [...new Set(mergedTeams.map(name => name.trim()))];

      // Filtrar los valores nulos y vacíos de uniqueTeams
      const validTeams = uniqueTeams.filter(name => name !== '');

      // Guardar los equipos válidos en la base de datos
      await Team.bulkCreate(validTeams.map(name => ({ name })));

      console.log('Equipos guardados en la base de datos.');
    } else {
      console.log('La tabla de equipos ya contiene datos.');
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while creating driver' });
    console.error(error);
  }
};

module.exports = { getTeamsAndSaveToDatabase };
