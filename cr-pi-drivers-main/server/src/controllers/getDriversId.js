const axios = require('axios');
const {Driver , Team} = require('../db')


const getDriversId = async (req, res) => {
  const idDriver = req.params.idDriver;
  try {
    const apiResponse = await axios.get(`http://localhost:5000/drivers/${idDriver}`);
    const dbDriver = await Driver.findByPk(idDriver, {
      include: Team,
    });

    if (apiResponse.data) {
      // Combina la información del conductor de la API y el equipo de la base de datos
      const driverDetails = {
        ...apiResponse.data,
        teams: dbDriver ? dbDriver.Teams : [],
      };

      res.json(driverDetails);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching driver details' });
  }
};

module.exports = { getDriversId};
