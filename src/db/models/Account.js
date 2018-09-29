const Joi = require('joi')
const Koi = require('../../utils/koi')

class Account {
  constructor (email, name, password) {
    // const data = {email, name, password} for cleaning and validating
    this.email = email
    this.name = name
    this.password = password
  }

  static validate (fields) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      name: Joi.string().min(3).max(40).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9\s]{6,30}$/).required()
    })
    // FIME joi.validate *maybe* async, check if tru
    // and evaluate v8n (it is imported at the top bu)
    const result = Joi.validate(fields, schema)
    // throw an error or do something similar to stop making an object
    // if no error return it
  }

  static clean (fields) {
    const schema = {
      email: Koi.string().trim(),
      name: Koi.string().trim()
    }
    // no async await for koi :/
    const result = Koi.clean(fields, schema)
  }

  static async matchPassword (typedEmail, typedPassword) {
    typedEmail = Account.clean({ email: typedEmail }).email
    // const user = await User.findOne({ where: { email } })
    // if (!user) {
    //   return done(null, false)
    // }
    // const hashedPassword = await hashPassword(password, user.password_salt)
    // if (hashedPassword !== user.password) {
    //   return done(null, false)
    // }
    // return done(null, user)
  }
}

module.exports = Account
