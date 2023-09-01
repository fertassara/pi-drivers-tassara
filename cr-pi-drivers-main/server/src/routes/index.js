const express = require('express');
const app = express();
const { conn } = require('../db');
const routerDriver = require('./routerDriver');
const routerTeam = require('./routerTeam');


app.use(express.json());

app.use('/drivers', routerDriver);
app.use('/teams', routerTeam);  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});




  module.exports = app;