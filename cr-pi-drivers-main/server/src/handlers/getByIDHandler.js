const { getByID } = require("../controllers/getByIDController"); // IMPORTA LA FUNCIÓN getByID DEL CONTROLADOR getByIdController

const getByIDHandler = async (req, res) => { // DEFINICIÓN DE LA FUNCIÓN DE MANEJO DE LA SOLICITUD
    const { id } = req.params; // OBTENCIÓN DEL ID DEL CONDUCTOR DESDE LOS PARÁMETROS DE LA SOLICITUD

    try {
        const response = await getByID(id); // LLAMA A LA FUNCIÓN getByID PARA OBTENER INFORMACIÓN DEL CONDUCTOR POR SU ID
        res.status(200).json(response) // RESPONDE CON UNA RESPUESTA JSON CON EL CÓDIGO DE ESTADO 200 Y LOS DATOS DEL CONDUCTOR
    } catch (error) {
        res.status(400).send(error.message) // MANEJO DE ERRORES: RESPONDE CON UN CÓDIGO DE ESTADO 400 Y EL MENSAJE DE ERROR SI OCURRE UN ERROR
    }
};

module.exports = { getByIDHandler }; // EXPORTA LA FUNCIÓN DE MANEJO DE LA SOLICITUD PARA SER USADA POR OTROS ARCHIVOS
