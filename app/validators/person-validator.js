var npmValidator = require('validator')
var messagesErrors = require('./messages/errors')

class PersonValidator {
  validate (data) {
    const errors = []
    const name = data['name']
    const dob = data['dob']
    const pet = data['pet']
    const status = data['status']

    if (!name || !npmValidator.isAlpha(name)) {
      errors.push(messagesErrors.NameIsRequired)
    }

    if (!dob || !npmValidator.isISO8601(dob)) {
      errors.push(messagesErrors.DobIsRequired)
    }

    if (pet && ['CAT', 'DOG', 'FISH'].indexOf(pet) === -1) {
      errors.push(messagesErrors.InvalidPet)
    }

    if (!status || ['NEW', 'ACTIVE', 'DELETED'].indexOf(status) === -1) {
      errors.push(messagesErrors.StatusIsRequired)
    }

    return errors.length > 0 ? errors : false
  }
}

exports.default = function (data) {
  return new PersonValidator().validate(data)
}
module.exports = exports['default']
