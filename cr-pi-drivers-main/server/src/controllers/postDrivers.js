const express = require('express');
const {Driver} = require('../db')

const postDrivers = async (req, res) => {
    const { name, teams, image } = req.body;
  console.log(name)
    // CREA IMAGEN POR DEF SI EL USUARIO NO PROPORCIONA UNA
    const defaultImage = 'https://picsum.photos/700/400?random';
  
    try {
      const newDriver = await Driver.create({ name, image: image || defaultImage });
  
      if (teams && teams.length > 0) {
        await newDriver.addTeams(teams);
      }
  
      res.status(201).json(newDriver);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating driver' });
    }
  };

  module.exports = {postDrivers}