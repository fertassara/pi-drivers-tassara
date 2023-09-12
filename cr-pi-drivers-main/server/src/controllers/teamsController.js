// Importa el modelo 'Team' desde el módulo '../db.js'
const { Team } = require('../db.js');

// Importa la función 'getAPIdrivers' desde el controlador './getDriversController.js'
const { getAPIdrivers } = require("./getDriversController.js");

// Importa el módulo 'dotenv' para cargar variables de entorno desde un archivo '.env'
require("dotenv").config();

// Define la función asincrónica 'getTeams'
const getTeams = async () => {
    // Crea un arreglo vacío para almacenar los nombres de los equipos
    const teamNames = [];

    // Consulta la base de datos para obtener todos los equipos
    const dbTeams = await Team.findAll();

    // Verifica si no hay equipos en la base de datos
    if (!dbTeams.length) {
        // Si no hay equipos en la base de datos, obtiene los conductores desde una API externa
        const apiDrivers = await getAPIdrivers();

        // Itera sobre los conductores obtenidos desde la API
        apiDrivers.forEach((driver) => {
            // Comprueba si 'driver.teams' es una cadena
            if (typeof driver.teams === 'string') {
                // Divide la cadena 'driver.teams' en un arreglo de equipos separados por comas
                const teams = driver.teams.split(',');

                // Itera sobre los equipos divididos
                teams.forEach((team) => {
                    // Elimina espacios en blanco alrededor del nombre del equipo y verifica si no está vacío
                    const trimmedTeam = team.trim();
                    if (trimmedTeam) {
                        // Agrega el nombre del equipo al arreglo 'teamNames'
                        teamNames.push(trimmedTeam);
                    }
                });
            }
        });

        // Elimina duplicados en el arreglo 'teamNames' utilizando un conjunto (Set)
        const uniqueTeams = [...new Set(teamNames)];

        // Crea un arreglo de objetos con los nombres de los equipos
        const addTeams = uniqueTeams.map((team) => ({
            name: team,
        }));
        
        try {
            // Agrega los equipos a la base de datos en modo de inserción masiva (bulkCreate)
            const createdTeams = await Team.bulkCreate(addTeams, {
                ignoreDuplicates: true, // Ignora equipos duplicados
            });
            console.log('Los equipos se han agregado correctamente a la base de datos.');
        } catch (error) {
            console.error('Error al crear los equipos:', error);
        };

        // Devuelve el arreglo de equipos únicos
        return uniqueTeams;
    } else {
        // Si hay equipos en la base de datos, simplemente devuelve los equipos desde la base de datos
        return dbTeams;
    }
};

// Exporta la función 'getTeams' para que esté disponible para otros módulos
module.exports = { getTeams };
