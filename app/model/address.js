var config = require('../../knexfile').development
var knex = require('knex')(config)

module.exports = {
  add: function (personId, newAddress) {
    return knex('address')
      .insert({
        personid: personId,
        addressline1: newAddress.addressline1,
        addressline2: newAddress.addressline2,
        addressline3: newAddress.addressline3,
        town: newAddress.town,
        county: newAddress.county,
        postcode: newAddress.postcode,
        country: newAddress.country
      })
      .then(function (ids) {
        return {
          id: ids[0],
          personid: personId,
          addressline1: newAddress.addressline1,
          addressline2: newAddress.addressline2,
          addressline3: newAddress.addressline3,
          town: newAddress.town,
          county: newAddress.county,
          postcode: newAddress.postcode,
          country: newAddress.country
        }
      })
  }
}
