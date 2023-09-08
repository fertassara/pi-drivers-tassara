const { Team } = require('../db.js'); // IMPORTACIÓN DEL MODELO Team DESDE UN ARCHIVO '../db'
const { getAPIdrivers } = require("./getDriversController.js"); // IMPORTACIÓN DE LA FUNCIÓN getAPIdrivers DESDE UN ARCHIVO './getDriversController'
require("dotenv").config(); // CONFIGURACIÓN DE VARIABLES DE ENTORNO DESDE EL ARCHIVO .env

const getTeams = async () => { // FUNCIÓN PARA OBTENER EQUIPOS
    const teamNames = []; // ARREGLO PARA ALMACENAR NOMBRES DE EQUIPOS

    const dbTeams = await Team.findAll(); // BÚSQUEDA DE EQUIPOS EN LA BASE DE DATOS
    const apiDrivers = await getAPIdrivers(); // OBTENCIÓN DE DATOS DE API DE DRIVERS

    if (!dbTeams.length) { // COMPROBACIÓN SI NO HAY EQUIPOS EN LA BASE DE DATOS

        apiDrivers.forEach((driver) => { // RECORRIDO DE LOS DATOS DE LOS DRIVERS DE LA API
            if (driver.teams) { // COMPROBACIÓN SI EL DRIVER TIENE EQUIPOS ASOCIADOS
                const teams = driver.teams.split(','); // DIVISIÓN DE LOS EQUIPOS SI HAY MÁS DE UNO EN LA CADENA
                teams.forEach((team) => {
                    const trimmedTeam = team.trim(); // ELIMINACIÓN DE ESPACIOS ALREDEDOR DEL NOMBRE DEL EQUIPO
                    if (trimmedTeam) {
                        teamNames.push(trimmedTeam); // AGREGACIÓN DE NOMBRES DE EQUIPOS INDIVIDUALES SIN ESPACIOS
                    }
            
                });
            }
        });

        const uniqueTeams = [...new Set(teamNames)]; // ELIMINACIÓN DE EQUIPOS REPETIDOS DEL ARREGLO ANTERIOR Y GUARDADO DE LOS ÚNICOS EN UN NUEVO ARREGLO

        const addTeams = uniqueTeams.map((team) => ({ // MAPEO DE EQUIPOS ÚNICOS PARA CREACIÓN EN LA BASE DE DATOS
            name: team, // ASIGNACIÓN DEL NOMBRE DEL EQUIPO
        }));
        
        try {
            const createdTeams = await Team.bulkCreate(addTeams, { // CREACIÓN DE EQUIPOS EN LA BASE DE DATOS
                ignoreDuplicates: true, // IGNORAR DUPLICADOS SI YA EXISTEN EQUIPOS CON EL MISMO NOMBRE
            });
            console.log('The teams have been successfully added to the database.'); // MENSAJE DE ÉXITO
            
        } catch (error) {

            console.error('Error creating teams:', error); // MANEJO DE ERRORES SI OCURRE UN PROBLEMA EN LA CREACIÓN DE EQUIPOS
        };
        return(uniqueTeams);

    } else return (dbTeams)
};

module.exports = { getTeams };
