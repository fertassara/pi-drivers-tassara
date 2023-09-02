const { Op } = require('sequelize');
const { Driver, Team } = require('../db');

const postDrivers = async (req, res) => {
    try {
        const driverData = req.body;

        // Verificar si 'teams' está presente y es un arreglo
        if (!Array.isArray(driverData.teams)) {
            throw new Error("'teams' should be an array");
        }

        const { name, firstName, lastName, description, image, nationality, birthDate, teams } = driverData;

        // Crear un nuevo conductor en la base de datos
        const newDriver = await Driver.create({
            name,
            firstName,
            lastName,
            description,
            image,
            nationality,
            birthDate,
        });

        // Buscar equipos existentes en la base de datos
        const existingTeams = await Team.findAll({
            where: {
                name: {
                    [Op.in]: teams,
                },
            },
        });

        // Asociar los equipos existentes al nuevo conductor
        await newDriver.addTeams(existingTeams);

        // Buscar el conductor recién creado con sus equipos asociados
        const finalDriver = await Driver.findByPk(newDriver.id, {
            include: [{ model: Team, attributes: ['id', 'name'] }],
        });

        res.status(200).json(finalDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postDrivers,
};
