const axios = require('axios'); // IMPORTACIÓN DEL MÓDULO AXIOS PARA REALIZAR PETICIONES HTTP
require('dotenv').config(); // IMPORTACIÓN DEL MÓDULO DOTENV PARA CARGAR VARIABLES DE ENTORNO
const { API_URL, DEFAULT_IMAGE } = process.env; // OBTENCIÓN DE VARIABLES DE ENTORNO
const { Driver, Team } = require('../db.js'); // IMPORTACIÓN DE MODELOS DE BASE DE DATOS

const getAPIdrivers = async () => {
  const apiDrivers = []; // CREACIÓN DE UN ARRAY PARA ALMACENAR LOS CONDUCTORES DE LA API

  const apiRequest = await axios.get(API_URL); // PETICIÓN GET A LA API CON LA URL DE API_URL
  const responses = await Promise.all([apiRequest]);

  // FOR PARA OBJETOS
  for (const response of responses) {
    const drivers = response.data.map((driver) => {
      return {
        id: driver.id,
        name: {
            forename: driver.name.forename,
            surname: driver.name.surname,
        },
        image: driver.image.url ? driver.image.url : DEFAULT_IMAGE, // COMPROBACIÓN DE EXISTENCIA DE IMAGEN
        dob: driver.dob,
        nationality: driver.nationality,
        teams: driver.teams,
        description: driver.description,
      };
    });
    apiDrivers.push(...drivers); // AGREGAR LOS CONDUCTORES ENCONTRADOS AL ARRAY apiDrivers
  }
  return apiDrivers; // RETORNAR EL ARRAY DE CONDUCTORES DE LA API
};

const getDBdrivers = async () => {
  const dbDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return dbDrivers; // RETORNAR LOS CONDUCTORES DE LA BASE DE DATOS
};

const getDrivers = async () => {
  const apiDrivers = await getAPIdrivers(); // OBTENER LOS CONDUCTORES DE LA API
  const dbDrivers = await getDBdrivers(); // OBTENER LOS CONDUCTORES DE LA BASE DE DATOS

  const allDrivers = apiDrivers.concat(dbDrivers); // COMBINAR LOS CONDUCTORES DE LA API Y DE LA BASE DE DATOS
  return allDrivers; // RETORNAR TODOS LOS CONDUCTORES
};

module.exports = { getDrivers, getAPIdrivers, getDBdrivers };
