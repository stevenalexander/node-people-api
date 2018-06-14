exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('person', function (table) {
      table.date('dob').defaultTo('01 January, 1980 UTC').notNullable()
      table.string('status', 10).defaultTo('ACTIVE').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('person', function (table) {
      table.dropColumn('dob')
      table.dropColumn('status')
    })
  ])
}
