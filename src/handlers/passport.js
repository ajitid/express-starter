const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { getManager } = require('typeorm')

const Account = require('../db/models/Account')

const db = getManager()

passport.serializeUser(function (account, done) {
  return done(null, account.email)
})

passport.deserializeUser(async function (email, done) {
  const account = await db.findOne(Account, { email })
  return done(null, account)
})

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async function (email, password, done) {
    const account = await db.findOne(Account, { email })
    if (!account) {
      return done(null, false)
    }
    const { password: encryptedTypedPassword } = await Account.getEncryptedFields(password, account.passwordSalt)
    if (account.password === encryptedTypedPassword) {
      return done(null, false)
    }
    return done(null, account)
  }
))
