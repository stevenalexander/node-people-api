var express = require('express')
var person = require('../model/person')

module.exports = function (app) {
  var route = express.Router()

  app.use('/people', route)

  route.get('/', function (req, res) {
    person.getAll().then(function (people) {
      res.json(people)
    }).catch(function (error) {
      res.status(500).json('error', {message: error.message, error: error})
    })
  })

  route.post('/', function (req, res) {
    person.add(req.body).then(function (newPersonId) {
      res.status(201).json(newPersonId)
    }).catch(function (error) {
      res.status(500).json('error', {message: error.message, error: error})
    })
  })

  route.delete('/:id', function (req, res) {
    person.del(parseInt(req.params.id)).then(function () {
      res.sendStatus(204)
    }).catch(function (error) {
      res.status(500).json('error', {message: error.message, error: error})
    })
  })
}
