const { Team } = require('../db.js');
const { getAPIdrivers } = require("./getDriversController.js");
require("dotenv").config();

const getTeams = async () => {
    const teamNames = [];

    const dbTeams = await Team.findAll();

    if (!dbTeams.length) {
        const apiDrivers = await getAPIdrivers();

        apiDrivers.forEach((driver) => {
            if (typeof driver.teams === 'string') { // Comprobación de que driver.teams es una cadena
                const teams = driver.teams.split(',');
                teams.forEach((team) => {
                    const trimmedTeam = team.trim();
                    if (trimmedTeam) {
                        teamNames.push(trimmedTeam);
                    }
                });
            }
        });

        const uniqueTeams = [...new Set(teamNames)];

        const addTeams = uniqueTeams.map((team) => ({
            name: team,
        }));
        
        try {
            const createdTeams = await Team.bulkCreate(addTeams, {
                ignoreDuplicates: true,
            });
            console.log('Los equipos se han agregado correctamente a la base de datos.');
        } catch (error) {
            console.error('Error al crear los equipos:', error);
        };
        return uniqueTeams;

    } else {
        return dbTeams;
    }
};

module.exports = { getTeams };
