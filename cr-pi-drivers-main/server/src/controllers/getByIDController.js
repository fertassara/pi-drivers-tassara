const axios = require('axios'); // IMPORTACIÓN DEL MÓDULO AXIOS PARA REALIZAR PETICIONES HTTP
require('dotenv').config(); // IMPORTACIÓN DEL MÓDULO DOTENV PARA CARGAR VARIABLES DE ENTORNO
const { API_URL, DEFAULT_IMAGE } = process.env; // OBTENCIÓN DE VARIABLES DE ENTORNO
const { Driver, Team } = require('../db.js'); // IMPORTACIÓN DE MODELOS DE BASE DE DATOS

const getByID = async (driverID) => {
    let IDFoundDriver = []; // INICIALIZACIÓN DE UN ARRAY PARA ALMACENAR LOS CONDUCTORES ENCONTRADOS

    if (driverID.length > 3) { // VERIFICACIÓN DE LONGITUD DEL ID DEL CONDUCTOR
        console.log("Executing search on database."); // MENSAJE DE CONSOLA INDICANDO LA BÚSQUEDA EN LA BASE DE DATOS
        const DBdriver = await Driver.findOne({ // BÚSQUEDA DEL CONDUCTOR EN LA BASE DE DATOS
            where: {
                id: driverID,
            },
            include: {
                model: Team,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        IDFoundDriver.push(DBdriver.dataValues); // AGREGAR EL CONDUCTOR ENCONTRADO AL ARRAY
    };
    if (driverID.length < 4) { // VERIFICACIÓN DE LONGITUD DEL ID DEL CONDUCTOR
        console.log("Executing search on API.") // MENSAJE DE CONSOLA INDICANDO LA BÚSQUEDA EN LA API
        const urlRequest = await axios(`${API_URL}/${driverID}`); // PETICIÓN HTTP A LA API CON EL ID DEL CONDUCTOR
        const { data } = urlRequest; // OBTENCIÓN DE LOS DATOS DE LA RESPUESTA

        const { id, name, image, dob, nationality, teams, description } = data; // EXTRACCIÓN DE DATOS DE LA RESPUESTA

        const apiDriver = {
            id: Number(id),
            name: {
                forename: name.forename,
                surname: name.surname,
            },
            image: image.url ? image.url : DEFAULT_IMAGE, // COMPROBACIÓN DE EXISTENCIA DE IMAGEN
            dob,
            nationality,
            teams,
            description,
        };
        IDFoundDriver.push(apiDriver); // AGREGAR EL CONDUCTOR ENCONTRADO AL ARRAY
    };

    if (IDFoundDriver.length > 0) { // VERIFICACIÓN DE SI SE ENCONTRARON CONDUCTORES
        return IDFoundDriver[0]; // DEVOLVER EL PRIMER CONDUCTOR ENCONTRADO
    } else {
        throw new Error('The driver with the given ID does not exist in the system.'); // LANZAR UN ERROR SI NO SE ENCONTRARON CONDUCTORES
    };
};

module.exports = { getByID };
