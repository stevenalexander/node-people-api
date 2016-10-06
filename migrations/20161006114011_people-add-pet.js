
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('person', function (table) {
      table.string('pet', 10)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('person', function (table) {
      table.dropColumn('pet')
    })
  ])
}
