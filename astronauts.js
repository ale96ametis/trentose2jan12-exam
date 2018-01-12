const express = require('express'),
    bodyParser = require('body-parser');
const astronauts = express.Router()

var uuid = require('uuid-v4');

const astronautsArray = [
  {
    "id": "1",
    "firstName": "Mario",
    "lastName": "Rossi",
    "isInSpace": true
},
{
  "id": "2",
  "firstName": "Mario",
  "lastName": "Verdi",
  "isInSpace": false
},
{
  "id": "3",
  "firstName": "Mario",
  "lastName": "Rossi",
  "isInSpace": false
},
{
  "id": "4",
  "firstName": "Mario",
  "lastName": "Blu",
  "isInSpace": false
}]

astronauts.route('/astronauts')
  //simpleget return all objects
  .get((req, res) => {
    var lastName = ''
    if (req.query.lastName) {
      lastName = req.query.lastName
      var checklastName = function (astronaut){
        return astronaut.lastName == lastName
      }
      var array = astronautsArray.filter(checklastName, lastName)
      res.json(array)
    }
    else {
      res.status(200)
      res.json(astronautsArray)
    }

  })
//post an object
  .post((req, res) => {
    var astronaut = {}
    astronaut.id = uuid()
    if (req.body.firstName) astronaut.firstName = req.body.firstName
    if (req.body.lastName) astronaut.lastName = req.body.lastName
    if (req.body.isInSpace) {
      astronaut.isInSpace = true
    } else {
      astronaut.isInSpace = false
    }
    astronautsArray.push(astronaut)
    res.status(200)
    res.json(astronaut)
  });
astronauts.route('/astronaut/:id')
  .get((req, res) => {
    var id = req.params.id
    const i = astronautsArray.findIndex(astronaut => {return astronaut.id == id})
    if (i==-1) res.sendStatus(404)
    else {
      res.status(200)
      res.json(astronautsArray[i])
    }
  })
  .put((req, res) => {
    var id = req.params.id
    const i = astronautsArray.findIndex(astronaut => {return astronaut.id == id})
    if (i==-1) res.sendStatus(404)
    else {
      if (req.body.firstName) astronautsArray[i].firstName = req.body.firstName
      if (req.body.lastName) astronautsArray[i].lastName = req.body.lastName
      if (req.body.isInSpace) {
        astronaut.isInSpace = true
      } else {
        astronaut.isInSpace = false
      }
      res.status(200)
      res.json(astronautsArray[i])
    }
  })


module.exports = astronauts
