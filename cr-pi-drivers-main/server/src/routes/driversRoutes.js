// Importa el módulo 'Router' desde 'express' para definir rutas de manejo de conductores
const { Router } = require("express");

// Importa el controlador 'getDriversHandler' desde '../handlers/getDriversHandler'
const { getDriversHandler } = require("../handlers/getDriversHandler");

// Importa el controlador 'getByIDHandler' desde '../handlers/getByIDHandler'
const { getByIDHandler } = require("../handlers/getByIDHandler");

// Importa el controlador 'createDriver' desde '../handlers/postDriverHandler'
const { createDriver } = require("../handlers/postDriverHandler");

// Importa el controlador 'getByNameHandler' desde '../handlers/getByNameHandler'
const { getByNameHandler } = require("../handlers/getByNameHandler");

// Importa el controlador 'postHandler' desde '../handlers/postDriverHandler'
const { postHandler } = require("../handlers/postDriverHandler");

// Crea un enrutador para las rutas relacionadas con los conductores
const driversRouter = Router();

// Define la ruta HTTP GET raíz ('/') que ejecuta el controlador 'getDriversHandler'
driversRouter.get("/", getDriversHandler);

// Define la ruta HTTP GET '/search' que ejecuta el controlador 'getByNameHandler'
driversRouter.get("/search", getByNameHandler);

// Define la ruta HTTP GET '/:id' que ejecuta el controlador 'getByIDHandler'
driversRouter.get("/:id", getByIDHandler);

// Define la ruta HTTP POST '/create' que ejecuta el controlador 'postHandler'
driversRouter.post("/create", postHandler);

// Exporta el enrutador 'driversRouter' para que esté disponible para otros módulos
module.exports = { driversRouter };
