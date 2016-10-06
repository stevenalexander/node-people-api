/* global describe beforeEach it */
var expect = require('chai').expect
var personValidator = require('../../app/validators/person-validator')
var errors = require('../../app/validators/messages/errors')

describe('personValidator', function () {
  beforeEach(function () {
  })

  describe('should validate person', function (done) {
    it('return true for valid person', function (done) {
      var data = {
        name: 'Adam',
        dob: 'Thu Oct 06 2016 09:00:00 GMT+0100 (BST)',
        status: 'NEW',
        pet: 'DOG'
      }

      var result = personValidator(data)

      expect(result).to.be.false
      done()
    })

    it('return error if name not supplied', function (done) {
      var result = personValidator({})
      expect(result).to.include(errors.NameIsRequired)
      done()
    })

    it('return error if name not alphanumeric', function (done) {
      var result = personValidator({ name: '1234' })
      expect(result).to.include(errors.NameIsRequired)
      done()
    })

    it('return error if dob not set', function (done) {
      var result = personValidator({})
      expect(result).to.include(errors.DobIsRequired)
      done()
    })

    it('return error if dob not valid', function (done) {
      var result = personValidator({ dob: 'A' })
      expect(result).to.include(errors.DobIsRequired)
      done()
    })

    it('return error if status not set', function (done) {
      var result = personValidator({})
      expect(result).to.include(errors.StatusIsRequired)
      done()
    })

    it('return error if status not valid', function (done) {
      var result = personValidator({ status: 'Cheese' })
      expect(result).to.include(errors.StatusIsRequired)
      done()
    })

    it('return no error if pet not set', function (done) {
      var result = personValidator({})
      expect(result).to.not.include(errors.InvalidPet)
      done()
    })

    it('return error if pet not valid', function (done) {
      var result = personValidator({ pet: 'Tiger' })
      expect(result).to.include(errors.InvalidPet)
      done()
    })
  })
})
