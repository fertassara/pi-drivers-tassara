const { Router } = require("express");
const { getTeamsHandler } = require("../handlers/getTeamsHandler");

const teamsRouter = Router();

teamsRouter.get("/", getTeamsHandler);

module.exports = { teamsRouter };