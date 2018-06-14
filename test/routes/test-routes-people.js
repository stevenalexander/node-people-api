/* eslint no-unused-expressions: 0 */
/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var person = require('../../app/model/person')
var address = require('../../app/model/address')

describe('index', () => {
  var request
  var stubPersonValidator
  var stubAddressValidator

  beforeEach(() => {
    var app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    stubPersonValidator = sinon.stub()
    stubAddressValidator = sinon.stub()

    var route = proxyquire('../../app/routes/people', {
      '../model/person': person,
      '../model/address': address,
      '../validators/person-validator': stubPersonValidator,
      '../validators/address-validator': stubAddressValidator
    })

    route(app)

    request = supertest(app)
  })

  describe('GET /people', () => {
    it('should respond with a 200 and return people', () => {
      var people = {people: [{name: 'Adam', dob: '1980-01-01T00:00:00.000Z', pet: null, status: 'ACTIVE'}]}
      var stubGetAll = sinon.stub(person, 'getAll').resolves(people)

      return request
        .get('/people')
        .expect(200)
        .then(function (response) {
          expect(stubGetAll.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(people))
        })
    })
  })

  describe('GET /people/1', () => {
    it('should respond with a 200 and return a person', () => {
      var onePerson = {name: 'Adam', dob: '1980-01-01T00:00:00.000Z', pet: null, status: 'ACTIVE'}
      var stubGet = sinon.stub(person, 'get').withArgs(1).resolves(onePerson)

      return request
        .get('/people/1')
        .expect(200)
        .then(function (response) {
          expect(stubGet.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(onePerson))
        })
    })
  })

  describe('POST /people', () => {
    it('should respond with a 201 and return item when valid', () => {
      stubPersonValidator.returns(false)
      var newPerson = {id: 1, name: 'Brian', dob: '1980-01-01T00:00:00.000Z', status: 'NEW'}
      var stubAdd = sinon.stub(person, 'add').resolves(newPerson)

      return request
        .post('/people')
        .type('json')
        .send(JSON.stringify(person))
        .expect(201)
        .then(function (response) {
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(stubAdd.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(newPerson))
        })
    })

    it('should respond with a 400 and return item when invalid', () => {
      var errorMessage = 'Error!'
      stubPersonValidator.returns([errorMessage])

      return request
        .post('/people')
        .type('json')
        .send(JSON.stringify(person))
        .expect(400)
        .then(function (response) {
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(response.text).to.contain(errorMessage)
        })
    })
  })

  describe('PUT /people/1', () => {
    it('should respond with a 200 and return item when valid', () => {
      stubPersonValidator.returns(false)
      var existingPerson = {name: 'Brian', dob: '1980-01-01T00:00:00.000Z', status: 'NEW'}
      var stubUpdate = sinon.stub(person, 'update').resolves(existingPerson)

      return request
        .put('/people/1')
        .type('json')
        .send(JSON.stringify(person))
        .expect(200)
        .then(function (response) {
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(stubUpdate.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(existingPerson))
        })
    })

    it('should respond with a 400 and return item when invalid', () => {
      var errorMessage = 'Error!'
      stubPersonValidator.returns([errorMessage])

      return request
        .put('/people/1')
        .type('json')
        .send(JSON.stringify(person))
        .expect(400)
        .then(function (response) {
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(response.text).to.contain(errorMessage)
        })
    })
  })

  describe('DELETE /people/1234', () => {
    it('should respond with a 204', () => {
      var stubDel = sinon.stub(person, 'del').resolves()

      return request
        .delete('/people/1234')
        .expect(204)
        .then(function (response) {
          expect(stubDel.calledOnce).to.be.true
        })
    })
  })

  describe('POST /people/1/address', () => {
    it('should respond with a 200 and return item when valid', () => {
      stubAddressValidator.returns(false)
      var newAddress = {addressline1: '1'}
      var stubAddressAdd = sinon.stub(address, 'add').resolves(newAddress)

      return request
        .post('/people/1/address')
        .type('json')
        .send(JSON.stringify(person))
        .expect(201)
        .then(function (response) {
          expect(stubAddressValidator.calledOnce).to.be.true
          expect(stubAddressAdd.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(newAddress))
        })
    })

    it('should respond with a 400 and return item when invalid', () => {
      var errorMessage = 'Error!'
      stubAddressValidator.returns([errorMessage])

      return request
        .post('/people/1/address')
        .type('json')
        .send(JSON.stringify(person))
        .expect(400)
        .then(function (response) {
          expect(stubAddressValidator.calledOnce).to.be.true
          expect(response.text).to.contain(errorMessage)
        })
    })
  })
})
