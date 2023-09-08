// drivers.Routes.js
const { Router } = require("express");
const { getDriversHandler } = require("../handlers/getDriversHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");
const { createDriver } = require("../handlers/postDriverHandler");
const { getByNameHandler } = require("../handlers/getByNameHandler");
//const { createDriver } = require("../controllers/postDriverController");
const { postHandler } = require("../handlers/postDriverHandler");


const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/search", getByNameHandler);
driversRouter.get("/:id", getByIDHandler);
driversRouter.post("/create", postHandler);

module.exports = { driversRouter };
