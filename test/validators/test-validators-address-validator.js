/* eslint no-unused-expressions: 0 */
/* global describe beforeEach it */
var expect = require('chai').expect
var addressValidator = require('../../app/validators/address-validator')
var errors = require('../../app/validators/messages/errors')

const STRING_11 = '01234567890'
const STRING_101 = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
const STRING_201 = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'

describe('addressValidator', () => {
  beforeEach(() => {
  })

  describe('should validate address', () => {
    it('return true for valid address', () => {
      var data = {
        addressline1: 'The Shoe',
        addressline2: '1 Motherhubbard Road',
        addressline3: 'Down the lane',
        town: 'Fables',
        county: 'SomeCounty',
        postcode: 'BT11 1BT',
        country: 'SomeCountry'
      }

      var result = addressValidator(data)

      expect(result).to.be.false
    })

    it('return errors for invalid address missing items', () => {
      var result = addressValidator({})
      expect(result).to.include(errors.AddressLine1IsRequired)
      expect(result).to.include(errors.AddressCountryIsRequired)
      expect(result.length).to.equal(2)
    })

    it('return errors for invalid address fields', () => {
      var data = {
        addressline1: STRING_201,
        addressline2: STRING_201,
        addressline3: STRING_201,
        town: STRING_101,
        county: STRING_101,
        postcode: STRING_11,
        country: STRING_101
      }

      var result = addressValidator(data)

      expect(result).to.include(errors.AddressLine1IsRequired)
      expect(result).to.include(errors.AddressLine2MaxSize)
      expect(result).to.include(errors.AddressLine3MaxSize)
      expect(result).to.include(errors.AddressTownMaxSize)
      expect(result).to.include(errors.AddressCountyMaxSize)
      expect(result).to.include(errors.AddressPostcodeMaxSize)
      expect(result).to.include(errors.AddressCountryIsRequired)
    })
  })
})
