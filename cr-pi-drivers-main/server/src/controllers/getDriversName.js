const axios = require('axios');
const { Driver } = require('../db');

const getDriversName = async (req, res) => {
  try {
    const queryWord = req.query.name.toLowerCase(); // Convertir la consulta a minúsculas

    // Consultar la API para obtener los conductores por nombre
    const apiResponse = await axios.get(`http://localhost:5000/drivers`);

    // Validar que la respuesta de la API contiene datos antes de intentar acceder a ellos
    if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
      throw new Error('API response does not contain valid data');
    }

    // Obtener los conductores desde la respuesta de la API
    const driversFromAPI = apiResponse.data;

    // Consultar la base de datos para obtener los conductores
    const dbDrivers = await Driver.findAll();

    // Filtrar los conductores que coinciden con la consulta (insensible a mayúsculas/minúsculas)
    const matchingDriversFromAPI = driversFromAPI.filter(driver =>
      driver.name?.forename?.toLowerCase()?.includes(queryWord) || // Busca en el campo "forename"
      driver.name?.surname?.toLowerCase()?.includes(queryWord) // Busca en el campo "surname"
    );

    const matchingDriversFromDB = dbDrivers.filter(driver =>
      driver.name?.forename?.toLowerCase()?.includes(queryWord) || // Busca en el campo "forename"
      driver.name?.surname?.toLowerCase()?.includes(queryWord) // Busca en el campo "surname"
    );

    // Mapear los conductores para incluir solo los campos deseados
    const matchingDrivers = matchingDriversFromAPI.concat(matchingDriversFromDB).map(driver => ({
      name: driver.name?.forename + ' ' + driver.name?.surname,
      firstName: driver.firstName,
      lastName: driver.lastName,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      birthDate: driver.birthDate,
      teams: driver.teams,
    }));

    if (matchingDrivers.length > 0) {
      res.json(matchingDrivers);
    } else {
      res.json({ message: 'No matching drivers found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching drivers' });
  }
};

module.exports = { getDriversName };
