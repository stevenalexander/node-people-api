const MIN_DATE = new Date('01 January, 1980 UTC')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('person', function (table) {
      table.date('dob').notNullable()
      table.string('status', 10).defaultTo('NEW').notNullable()
    }),
    knex('person').where('dob', '<', MIN_DATE).update({dob: MIN_DATE}),
    knex('person').update({status: 'ACTIVE'})
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
