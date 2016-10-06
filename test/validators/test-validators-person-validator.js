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

    it('return errors for invalid person missing items', function (done) {
      var result = personValidator({})
      expect(result).to.include(errors.NameIsRequired)
      expect(result).to.include(errors.DobIsRequired)
      expect(result).to.include(errors.StatusIsRequired)
      expect(result.length).to.equal(3)
      done()
    })

    it('return errors for invalid person fields', function (done) {
      var data = {
        name: '1234',
        dob: 'A',
        status: 'Cheese',
        pet: 'Tiger'
      }

      var result = personValidator(data)

      expect(result).to.include(errors.NameIsRequired)
      expect(result).to.include(errors.DobIsRequired)
      expect(result).to.include(errors.StatusIsRequired)
      expect(result).to.include(errors.InvalidPet)
      done()
    })
  })
})
