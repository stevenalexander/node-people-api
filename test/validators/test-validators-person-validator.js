/* eslint no-unused-expressions: 0 */
/* global describe beforeEach it */
var expect = require('chai').expect
var personValidator = require('../../app/validators/person-validator')
var errors = require('../../app/validators/messages/errors')

describe('personValidator', () => {
  beforeEach(() => {
  })

  describe('should validate person', () => {
    it('return true for valid person', () => {
      var data = {
        name: 'Adam',
        dob: '2016-10-06',
        status: 'NEW',
        pet: 'DOG'
      }

      var result = personValidator(data)

      expect(result).to.be.false
    })

    it('return errors for invalid person missing items', () => {
      var result = personValidator({})
      expect(result).to.include(errors.NameIsRequired)
      expect(result).to.include(errors.DobIsRequired)
      expect(result).to.include(errors.StatusIsRequired)
      expect(result.length).to.equal(3)
    })

    it('return errors for invalid person fields', () => {
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
    })
  })
})
