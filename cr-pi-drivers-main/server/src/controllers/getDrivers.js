const axios = require('axios');

const getDrivers = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    const drivers = response.data;

    // FILTRO LA INFO QUE QUEIRO
    const driversWithSelectedInfo = drivers.map(driver => ({
      name: driver.name?.forename + ' ' + driver.name?.surname,
      firstName: driver.firstName,
      lastName: driver.lastName,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      birthDate: driver.birthDate,
      teams: driver.teams,
    }));

    res.json(driversWithSelectedInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching drivers' });
  }
};

module.exports = { getDrivers };
