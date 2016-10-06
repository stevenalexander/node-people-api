var npmValidator = require('validator')
var messagesErrors = require('./messages/errors')
var constants = require('../constants')

class AddressValidator {
  validate (data) {
    const errors = []
    const addressline1 = data['addressline1']
    const addressline2 = data['addressline2']
    const addressline3 = data['addressline3']
    const town = data['town']
    const county = data['county']
    const postcode = data['postcode']
    const country = data['country']

    if (!addressline1 || !npmValidator.isLength(addressline1, {min: 0, max: constants.MAX_ADDRESSLINE})) {
      errors.push(messagesErrors.AddressLine1IsRequired)
    }

    if (addressline2 && !npmValidator.isLength(addressline2, {min: 0, max: constants.MAX_ADDRESSLINE})) {
      errors.push(messagesErrors.AddressLine2MaxSize)
    }
    if (addressline3 && !npmValidator.isLength(addressline3, {min: 0, max: constants.MAX_ADDRESSLINE})) {
      errors.push(messagesErrors.AddressLine3MaxSize)
    }
    if (town && !npmValidator.isLength(town, {min: 0, max: constants.MAX_ADDRESS_TOWN})) {
      errors.push(messagesErrors.AddressTownMaxSize)
    }
    if (county && !npmValidator.isLength(county, {min: 0, max: constants.MAX_ADDRESS_COUNTY})) {
      errors.push(messagesErrors.AddressCountyMaxSize)
    }
    if (postcode && !npmValidator.isLength(postcode, {min: 0, max: constants.MAX_ADDRESS_POSTCODE})) {
      errors.push(messagesErrors.AddressPostcodeMaxSize)
    }

    if (!country || !npmValidator.isLength(country, {min: 0, max: constants.MAX_ADDRESS_COUNTRY})) {
      errors.push(messagesErrors.AddressCountryIsRequired)
    }

    return errors.length > 0 ? errors : false
  }
}

exports.default = function (data) {
  return new AddressValidator().validate(data)
}
module.exports = exports['default']
