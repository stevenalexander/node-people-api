
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('address', function (table) {
      table.increments()
      table.integer('personid').notNullable().unsigned().index().references('id').inTable('person')
      table.string('addressline1', 200).notNullable()
      table.string('addressline2', 200)
      table.string('addressline3', 200)
      table.string('town', 100)
      table.string('county', 100)
      table.string('postcode', 10)
      table.string('country', 100).notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('address')
  ])
}
