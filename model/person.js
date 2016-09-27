var config = require('../knexfile').development
var knex = require('knex')(config)

module.exports = {
  getAll: function () {
    return knex('person').select('id', 'name')
  },
  add: function (newPerson) {
    return knex('person').insert({name: newPerson.name})
      .then(function (ids) { return {id: ids[0], name: newPerson.name} })
  },
  del: function (id) {
    return knex('person').where('id', id).del()
  }
}
