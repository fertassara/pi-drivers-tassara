const axios = require('axios');

const getDrivers = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    const drivers = response.data;

    // Agregar imagen por defecto a los conductores sin imagen
    const driversWithDefaultImage = drivers.map(driver => {
      if (!driver.image) {
        return { ...driver, image: 'https://picsum.photos/700/400?random'};
      }
      return driver;
    });

    res.json(driversWithDefaultImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching drivers' });
  }
};

module.exports = {getDrivers};
