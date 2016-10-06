var config = require('../../knexfile').development
var knex = require('knex')(config)

module.exports = {
  getAll: function () {
    return knex('person').select('id', 'name', 'dob', 'status')
  },
  add: function (newPerson) {
    return knex('person')
      .insert({
        name: newPerson.name,
        dob: new Date(newPerson.dob),
        status: newPerson.status
      })
      .then(function (ids) {
        return {
          id: ids[0],
          name: newPerson.name,
          dob: newPerson.dob,
          status: newPerson.status
        }
      })
  },
  del: function (id) {
    return knex('person').where('id', id).del()
  }
}
