const NAME_IS_REQUIRED = 'name must be supplied and only alphabetic characters'
const DOB_IS_REQUIRED = 'dob must be supplied and a valid ISO 8601 date'
const STATUS_IS_REQUIRED = 'status must be supplied and NEW/ACTIVE/DELETED'

module.exports = {
  NameIsRequired: NAME_IS_REQUIRED,
  DobIsRequired: DOB_IS_REQUIRED,
  StatusIsRequired: STATUS_IS_REQUIRED
}
