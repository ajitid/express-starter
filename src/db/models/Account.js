const Joi = require('joi')

const Koi = require('../../utils/koi')
const { hashString, makeSalt } = require('../../utils/encrypt')

class Account {
  // if using TS, make ctor private <- nooo as this will create issue in making user
  constructor (email, name, password, passwordSalt) {
    // FIXME this is stopping migrations, as well as writing entities @ db/index.js
    // fields = Account.clean(fields)
    // how to handle errors from the above two
    this.email = email
    this.name = name
    this.password = password
    this.password_salt = passwordSalt
  }

  static async createAccount (email, name, password) {
    let account = null
    let fields = { email, name, password }
    fields = Account.clean(fields)
    const validated = Account.validate(fields)
    if (!validated.error) {
      const { password: hashedPassword, passwordSalt } = await Account.getEncryptedFields(password)
      account = new Account(fields.email, fields.name, hashedPassword, passwordSalt)
    }
    return account
  }

  static clean (fields) {
    const schema = {
      email: Koi.string().trim(),
      name: Koi.string().trim()
    }
    // no async await for koi :/
    return Koi.clean(fields, schema)
  }

  static validate (fields) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      name: Joi.string().min(3).max(40).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9\s]{6,30}$/).required()
    })
    // FIME joi.validate *maybe* async, check if tru
    // and evaluate v8n (it is imported at the top bu)
    return Joi.validate(fields, schema)
    // throw an error or do something similar to stop making an object
    // if no error return it
  }

  static async getEncryptedFields (password, salt) {
    if (!salt) {
      salt = await makeSalt()
    }
    password = await hashString(password, salt)
    return {
      password,
      passwordSalt: salt
    }
  }
}

module.exports = Account
