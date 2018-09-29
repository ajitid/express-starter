const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../db/models/index').user
const { hashPassword } = require('../utils')

passport.serializeUser(function (user, done) {
  return done(null, user.email)
})

passport.deserializeUser(async function (email, done) {
  const user = await User.findOne({ where: { email } })
  return done(null, user)
})

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return done(null, false)
    }
    const hashedPassword = await hashPassword(password, user.password_salt)
    if (hashedPassword !== user.password) {
      return done(null, false)
    }
    return done(null, user)
  }
))
