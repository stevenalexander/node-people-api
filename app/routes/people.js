var express = require('express')
var person = require('../model/person')
var address = require('../model/address')
var personValidator = require('../validators/person-validator')
var addressValidator = require('../validators/address-validator')

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

  route.get('/:id', function (req, res) {
    person.get(parseInt(req.params.id)).then(function (person) {
      res.status(200).json(person)
    }).catch(function (error) {
      res.status(500).json({message: error.message, errors: error})
    })
  })

  route.post('/', function (req, res) {
    var errors = personValidator(req.body)
    if (!errors) {
      person.add(req.body).then(function (newPerson) {
        res.status(201).json(newPerson)
      }).catch(function (error) {
        res.status(500).json({message: error.message, errors: error})
      })
    } else {
      res.status(400).json({message: 'Invalid person', errors: errors})
    }
  })

  route.put('/:id', function (req, res) {
    var errors = personValidator(req.body)
    if (!errors) {
      person.update(req.params.id, req.body).then(function (existingPerson) {
        res.status(200).json(existingPerson)
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

  route.post('/:id/address', function (req, res) {
    var errors = addressValidator(req.body)
    if (!errors) {
      address.add(req.params.id, req.body).then(function (newAddress) {
        res.status(201).json(newAddress)
      }).catch(function (error) {
        res.status(500).json({message: error.message, errors: error})
      })
    } else {
      res.status(400).json({message: 'Invalid address', errors: errors})
    }
  })

  route.get('/status', function (req, res) {
    res.json({'status': 'OK'})
  })
}
