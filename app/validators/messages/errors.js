const constants = require('../../constants')

module.exports = {
  NameIsRequired: 'name must be supplied and only alphabetic characters',
  DobIsRequired: 'dob must be supplied and a valid ISO 8601 date',
  StatusIsRequired: 'status must be supplied and NEW/ACTIVE/DELETED',
  InvalidPet: 'pet must be CAT/DOG/FISH',
  AddressLine1IsRequired: `addressline1 must be supplied and less than ${constants.MAX_ADDRESSLINE} characters`,
  AddressLine2MaxSize: `addressline2 must be less than ${constants.MAX_ADDRESSLINE} characters`,
  AddressLine3MaxSize: `addressline3 must be less than ${constants.MAX_ADDRESSLINE} characters`,
  AddressTownMaxSize: `town must be less than ${constants.MAX_ADDRESS_TOWN} characters`,
  AddressCountyMaxSize: `county must be less than ${constants.MAX_ADDRESS_COUNTY} characters`,
  AddressPostcodeMaxSize: `postcode must be less than ${constants.MAX_ADDRESS_POSTCODE} characters`,
  AddressCountryIsRequired: `country must be supplied and less than ${constants.MAX_ADDRESS_COUNTRY} characters`
}

