const express = require('express'),
    bodyParser = require('body-parser');
const astronauts = express.Router()

var uuid = require('uuid-v4');

const astronautsArray = []

astronauts.route('/astronauts')
  //simpleget return all objects
    .get((req, res) => {
    res.status(200)
    res.json(astronautsArray)
  })
//post an object
  .post((req, res) => {
    var astronaut = {}
    astronaut.id = uuid()
    if (req.body.firstName) astronaut.firstName = req.body.firstName
    if (req.body.lastName) astronaut.lastName = req.body.lastName
    if (req.body.isInSpace) astronaut.isInSpace = req.body.isInSpace
    astronautsArray.push(astronaut)
    res.status(200)
    res.json(astronaut)
  });


module.exports = astronauts
