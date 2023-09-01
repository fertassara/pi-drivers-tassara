const axios = require('axios');
const { Team } = require('../models/Team'); // Importa el modelo de equipos de Sequelize

const getTeamsAndSaveToDatabase = async () => {
  try {
    // Verifica si la tabla de equipos está vacía
    const isEmpty = await Team.count() === 0;

    if (isEmpty) {
      // Si está vacía, obtén los equipos de la API
      const response = await axios.get('http://localhost:5000/drivers');
      const drivers = response.data;

      // Obtener todos los equipos de los conductores
      const teams = drivers.map(driver => driver.team);

      // Eliminar duplicados de la lista de equipos
      const uniqueTeams = Array.from(new Set(teams));

      // Guardar los equipos en la base de datos
      await Team.bulkCreate(uniqueTeams.map(name => ({ name })));

      console.log('Equipos guardados en la base de datos.');
    } else {
      console.log('La tabla de equipos ya contiene datos.');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTeamsAndSaveToDatabase };
