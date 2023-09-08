const { Router } = require("express"); // IMPORTA EL OBJETO Router DE EXPRESS
const morgan = require("morgan"); // IMPORTA EL MIDDLEWARE DE REGISTRO DE SOLICITUDES MORGAN
const cors = require("cors"); // IMPORTA EL MIDDLEWARE DE CORS PARA MANEJAR LA POLÍTICA DE ORÍGENES CRUZADOS
const { driversRouter } = require("./driversRoutes"); // IMPORTA EL ENRUTADOR DE LAS RUTAS DE LOS CONDUCTORES
const { teamsRouter } = require("./teamsRoutes.js"); // IMPORTA EL ENRUTADOR DE LAS RUTAS DE LOS EQUIPOS

const router = Router(); // CREA UN OBJETO Router

router.use(morgan("dev")); // APLICA EL MIDDLEWARE MORGAN PARA REGISTRAR SOLICITUDES EN EL FORMATO 'dev'
router.use(cors()); // APLICA EL MIDDLEWARE CORS PARA MANEJAR LAS SOLICITUDES DE ORÍGENES CRUZADOS

router.use('/drivers', driversRouter); // DEFINE EL ENRUTADOR DE LAS RUTAS DE LOS CONDUCTORES EN LA RUTA '/drivers'
router.use('/teams', teamsRouter); // DEFINE EL ENRUTADOR DE LAS RUTAS DE LOS EQUIPOS EN LA RUTA '/teams'

module.exports = router; // EXPORTA EL ENRUTADOR PRINCIPAL PARA QUE PUEDA SER UTILIZADO POR TU APLICACIÓN
