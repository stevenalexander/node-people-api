var express = require('express')
var person = require('../model/person')
var personValidator = require('../validators/person-validator')

module.exports = function (app) {
  var route = express.Router()

  app.use('/people', route)

  route.get('/', function (req, res) {
    person.getAll().then(function (people) {
      res.status(200).json(people)
    }).catch(function (error) {
      res.status(500).json({message: error.message, errors: error})
    })
  })

  route.post('/', function (req, res) {
    var errors = personValidator(req.body)
    if (!errors) {
      person.add(req.body).then(function (newPersonId) {
        res.status(201).json(newPersonId)
      }).catch(function (error) {
        res.status(500).json({message: error.message, errors: error})
      })
    } else {
      res.status(400).json({message: 'Invalid person', errors: errors})
    }
  })

  route.delete('/:id', function (req, res) {
    person.del(parseInt(req.params.id)).then(function () {
      res.sendStatus(204)
    }).catch(function (error) {
      res.status(500).json({message: error.message, errors: error})
    })
  })

  route.get('/status', function (req, res) {
    res.json({'status': 'OK'})
  })
}
