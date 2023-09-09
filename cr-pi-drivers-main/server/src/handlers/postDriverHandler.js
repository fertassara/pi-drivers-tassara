const { createDriver } = require("../controllers/postDriverController"); // IMPORTA LA FUNCIÓN createDriver DEL CONTROLADOR postDriverController

const postHandler = async (req, res) => { // DEFINICIÓN DE LA FUNCIÓN DE MANEJO DE LA SOLICITUD POST
    try {
        const driverData = req.body; // OBTIENE LOS DATOS DEL CONDUCTOR DEL CUERPO DE LA SOLICITUD
        const response = await createDriver(driverData); // LLAMA A LA FUNCIÓN createDriver PARA CREAR UN NUEVO CONDUCTOR CON LOS DATOS PROPORCIONADOS
        res.status(200).json(response); // RESPONDE CON UNA RESPUESTA JSON CON EL CÓDIGO DE ESTADO 200 Y LOS DATOS DEL CONDUCTOR CREADO
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message }); // MANEJO DE ERRORES: RESPONDE CON UN CÓDIGO DE ESTADO 400 Y EL MENSAJE DE ERROR SI OCURRE UN ERROR
    }
};

module.exports = { postHandler }; // EXPORTA LA FUNCIÓN DE MANEJO DE LA SOLICITUD POST PARA SER USADA POR OTROS ARCHIVOS
