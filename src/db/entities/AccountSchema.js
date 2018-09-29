const { EntitySchema } = require('typeorm')
const Account = require('../models/Account')

module.exports = new EntitySchema({
  target: Account,
  columns: {
    email: {
      primary: true,
      type: 'varchar'
    },
    name: {
      type: 'varchar'
    },
    password: {
      type: 'varchar'
    },
    password_salt: {
      type: 'varchar'
    }
  }
})
