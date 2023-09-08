const { getTeams } = require("../controllers/teamsController"); // IMPORTA LA FUNCIÓN getTeams DEL CONTROLADOR teamsController

const getTeamsHandler = async (req, res) => { // DEFINICIÓN DE LA FUNCIÓN DE MANEJO DE LA SOLICITUD
    try {
        const response = await getTeams(); // LLAMA A LA FUNCIÓN getTeams PARA OBTENER LA LISTA DE EQUIPOS
        res.status(200).json(response); // RESPONDE CON UNA RESPUESTA JSON CON EL CÓDIGO DE ESTADO 200 Y LOS DATOS DE LOS EQUIPOS OBTENIDOS
    } catch (error) {
        res.status(400).send({ error: error.message }); // MANEJO DE ERRORES: RESPONDE CON UN CÓDIGO DE ESTADO 400 Y EL MENSAJE DE ERROR SI OCURRE UN ERROR
    }
};

module.exports = { getTeamsHandler }; // EXPORTA LA FUNCIÓN DE MANEJO DE LA SOLICITUD PARA SER USADA POR OTROS ARCHIVOS
