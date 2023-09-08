const axios = require("axios");
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js').conn.models;
const { getDrivers, getAPIdrivers, getDBdrivers } = require("./getDriversController.js");

const getByName = async (nombreOriginal) => {

    if (!nombreOriginal) {
        throw new Error ('Ingresa un nombre.');
    };
    const apiDrivers = await getAPIdrivers();

    const nombreConFormato = nombreOriginal.charAt(0).toUpperCase() + nombreOriginal.slice(1).toLowerCase();
    console.log(`Nombre obtenido ${nombreOriginal} convertido a ${nombreConFormato}`);

    const dbConductorEncontrado = await Driver.findAll({
        where: {
            forename: nombreConFormato,
        },
        include: {
            model: Team,
            attributes: ["name"],
            through: {
              attributes: [],
            },
         },
    });

    const apiConductoresEncontrados = apiDrivers.filter((conductor) => conductor.name.forename == nombreConFormato);

    const conductoresEncontrados = dbConductorEncontrado.concat(apiConductoresEncontrados);
    if (!conductoresEncontrados.length){
        throw new Error (`El conductor ${nombreConFormato} no se encuentra.`);
    } else{
        return conductoresEncontrados;
    };
};

module.exports = { getByName };
