const express = require('express');
const app = express();
const { conn } = require('../db');
const routerDriver = require('./routerDriver');
const routerTeam = require('./routerTeam');

app.use(express.json());

app.use('/driver', routerDriver);
app.use('/team', routerTeam);



  module.exports = app;