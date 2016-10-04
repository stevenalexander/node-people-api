/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var person = require('../../app/model/person')
require('sinon-bluebird')

describe('index', function () {
  var request

  beforeEach(function () {
    // Setting up the app this way means all dependencies from app.js are explicitly defined per route file
    var app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    var route = proxyquire('../../app/routes/people', { '../model/person': person })

    route(app)

    request = supertest(app)
  })

  describe('GET /people', function () {
    it('should respond with a 200 and return people', function (done) {
      var people = {people: [{name: 'Adam'}]}
      var stubGetAll = sinon.stub(person, 'getAll').resolves(people)

      request
        .get('/people')
        .expect(200)
        .end(function (error, response) {
          expect(stubGetAll.calledOnce).to.be.true
          expect(error).to.be.null
          expect(response.text).to.equal(JSON.stringify(people))
          done()
        })
    })
  })

  describe('POST /people', function () {
    it('should respond with a 201 and return item', function (done) {
      var newPerson = {id: 1, name: 'Brian'}
      var stubAdd = sinon.stub(person, 'add').resolves(newPerson)

      request
        .post('/people')
        .type('json')
        .send(JSON.stringify(person))
        .expect(201)
        .end(function (error, response) {
          expect(stubAdd.calledOnce).to.be.true
          expect(error).to.be.null
          expect(response.text).to.equal(JSON.stringify(newPerson))
          done()
        })
    })
  })

  describe('DELETE /people/1234', function () {
    it('should respond with a 204', function (done) {
      var stubDel = sinon.stub(person, 'del').resolves()

      request
        .delete('/people/1234')
        .expect(204)
        .end(function (error, response) {
          expect(stubDel.calledOnce).to.be.true
          expect(error).to.be.null
          done()
        })
    })
  })
})
