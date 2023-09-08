const { Op } = require('sequelize'); // IMPORTACIÓN DEL OPERADOR 'Op' DE SEQUELIZE
const { Driver, Team } = require('../db'); // IMPORTACIÓN DE LOS MODELOS Driver Y Team DESDE UN ARCHIVO '../db'

const createDriver = async (driverData) => { // FUNCIÓN PARA CREAR UN CONDUCTOR
    try {
        // Verificar si 'teams' está presente y es un arreglo
        if (!Array.isArray(driverData.teams)) { // VERIFICACIÓN DE SI 'teams' ES UN ARREGLO
            throw new Error("'teams' should be an array"); // LANZAR UN ERROR SI 'teams' NO ES UN ARREGLO
        }

        const { name, forename, surname, description, image, nationality, dob, teams } = driverData; // DESESTRUCTURACIÓN DE driverData

        // Proporciona una URL de imagen por defecto si no se proporciona una imagen específica
        const defaultImage = 'URL_de_la_imagen_por_defecto'; // DEFINICIÓN DE LA IMAGEN POR DEFECTO

        // Utiliza la imagen proporcionada o la imagen por defecto
        const driverImage = image || defaultImage; // ASIGNACIÓN DE LA IMAGEN PROPORCIONADA O POR DEFECTO

        // Crear un nuevo conductor en la base de datos
        const newDriver = await Driver.create({ // CREACIÓN DE UN NUEVO CONDUCTOR EN LA BASE DE DATOS
            name,
            forename,
            surname,
            description,
            image: driverImage, // Usar la imagen proporcionada o la imagen por defecto
            nationality,
            dob,
        });

        // Buscar equipos existentes en la base de datos
        const existingTeams = await Team.findAll({ // BÚSQUEDA DE EQUIPOS EXISTENTES EN LA BASE DE DATOS
            where: {
                name: {
                    [Op.in]: teams, // BUSCAR EQUIPOS CON NOMBRES EN LA LISTA 'teams'
                },
            },
        });

        // Asociar los equipos existentes al nuevo conductor
        await newDriver.addTeams(existingTeams); // ASOCIAR LOS EQUIPOS ENCONTRADOS AL NUEVO CONDUCTOR

        // Buscar el conductor recién creado con sus equipos asociados
        const finalDriver = await Driver.findByPk(newDriver.id, { // BÚSQUEDA DEL CONDUCTOR CON SUS EQUIPOS
            include: [{ model: Team, attributes: ['id', 'name'] }], // INCLUSIÓN DE LA INFORMACIÓN DE LOS EQUIPOS
        });

        return finalDriver; // RETORNO DEL CONDUCTOR CREADO CON SUS EQUIPOS ASOCIADOS
    } catch (error) {
        throw error; // LANZAR UN ERROR SI OCURRE UN PROBLEMA
    }
};

module.exports = {
    createDriver
};
