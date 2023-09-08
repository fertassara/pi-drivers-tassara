const { getDrivers } = require("../controllers/getDriversController"); // IMPORTA LA FUNCIÓN getDrivers DEL CONTROLADOR getDriversController

const getDriversHandler = async (req, res) => { // DEFINICIÓN DE LA FUNCIÓN DE MANEJO DE LA SOLICITUD
  try {
    const response = await getDrivers(); // LLAMA A LA FUNCIÓN getDrivers PARA OBTENER LA LISTA DE CONDUCTORES
    res.status(200).json(response); // RESPONDE CON UNA RESPUESTA JSON CON EL CÓDIGO DE ESTADO 200 Y LOS DATOS DE LOS CONDUCTORES OBTENIDOS
  } catch (error) {
    res.status(400).send({ error: error.message }); // MANEJO DE ERRORES: RESPONDE CON UN CÓDIGO DE ESTADO 400 Y EL MENSAJE DE ERROR SI OCURRE UN ERROR
  }
};

module.exports = { getDriversHandler }; // EXPORTA LA FUNCIÓN DE MANEJO DE LA SOLICITUD PARA SER USADA POR OTROS ARCHIVOS
