var config = require('../../knexfile').development
var knex = require('knex')(config)

module.exports = {
  getAll: function () {
    return knex('person').select('id', 'name', 'dob', 'pet', 'status')
  },
  get: function (id) {
    return knex.select('*')
      .from('person')
      .leftJoin('address', 'person.id', 'address.personid')
      .where('person.id', id)
      .then(function (personAddresses) {
        var addresses = []
        for (var personAddress of personAddresses) {
          addresses.push({
            addressline1: personAddress['addressline1'],
            addressline2: personAddress['addressline2'],
            addressline3: personAddress['addressline3'],
            town: personAddress['town'],
            county: personAddress['county'],
            postcode: personAddress['postcode'],
            country: personAddress['country']
          })
        }

        return {
          name: personAddresses[0]['name'],
          dob: personAddresses[0]['dob'],
          status: personAddresses[0]['status'],
          pet: personAddresses[0]['pet'],
          addresses: addresses
        }
      })
  },
  add: function (newPerson) {
    return knex('person')
      .insert({
        name: newPerson.name,
        dob: new Date(newPerson.dob),
        pet: newPerson.pet,
        status: newPerson.status
      })
      .then(function (ids) {
        return {
          id: ids[0],
          name: newPerson.name,
          dob: newPerson.dob,
          pet: newPerson.pet,
          status: newPerson.status
        }
      })
  },
  update: function (id, existingPerson) {
    return knex('person')
      .where('id', id)
      .update({
        name: existingPerson.name,
        dob: new Date(existingPerson.dob),
        pet: existingPerson.pet,
        status: existingPerson.status
      })
      .then(function (ids) {
        return {
          id: id,
          name: existingPerson.name,
          dob: existingPerson.dob,
          pet: existingPerson.pet,
          status: existingPerson.status
        }
      })
  },
  del: function (id) {
    return knex('person').where('id', id).del()
  }
}
