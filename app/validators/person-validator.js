var npmValidator = require('validator')
var messagesErrors = require('./messages/errors')

// Example of a base validator class used to reduce repeating code for forms with similar sets of fields
class PersonValidator {
  validate (data) {
    const errors = []
    const name = data['name']
    const dob = data['dob']
    const status = data['status']

    if (!name || !npmValidator.isAlpha(name)) {
      errors.push(messagesErrors.NameIsRequired)
    }

    if (!dob || !npmValidator.isDate(dob)) {
      errors.push(messagesErrors.DobIsRequired)
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
