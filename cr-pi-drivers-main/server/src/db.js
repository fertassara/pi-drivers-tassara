require("dotenv").config(); // CARGA VARIABLES DE ENTORNO DESDE UN ARCHIVO .env
const { Sequelize } = require("sequelize"); // IMPORTA LA LIBRERÍA SEQUELIZE
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; // OBTIENE LAS VARIABLES DE ENTORNO PARA LA CONEXIÓN A LA BASE DE DATOS
// IMPORTA LAS FUNCIONES QUE DEFINEN LOS MODELOS DE DRIVER Y TEAM
const defineDrivers = require ('./models/Driver');
const defineTeams = require ('./models/Team');


// CREA UNA INSTANCIA DE SEQUELIZE PARA LA CONEXIÓN A LA BASE DE DATOS
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, // DESACTIVA LOS MENSAJES DE LOGGING
  native: false, // DESACTIVA EL USO DEL DRIVER NATIVO DE POSTGRES
});
const basename = path.basename(__filename);

const modelDefiners = [];

// LEER LOS ARCHIVOS DE MODELOS EN LA CARPETA /models Y CARGARLOS
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// DEFINIR LOS MODELOS EN LA INSTANCIA DE SEQUELIZE
modelDefiners.forEach(model => model(sequelize));

// RENOMBRAR LOS MODELOS CON LA PRIMERA LETRA EN MAYÚSCULA PARA CONVENCIONES
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// INVOCAR LAS FUNCIONES QUE DEFINEN LOS MODELOS
defineDrivers(sequelize);
defineTeams(sequelize);

// OBTENER LAS REFERENCIAS A LOS MODELOS DE DRIVER Y TEAM
const { Driver, Team } = sequelize.models;

// DEFINIR LAS RELACIONES ENTRE LOS MODELOS
Driver.belongsToMany(Team, {through: 'Driver_Team'});
Team.belongsToMany(Driver, {through: 'Driver_Team'});

// SINCRONIZAR LA BASE DE DATOS
sequelize.sync({ force: false }) // Cambiar a true si deseo que se eliminen y vuelvan a crear las tablas
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// EXPORTAR LOS MODELOS Y LA INSTANCIA DE SEQUELIZE
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};
