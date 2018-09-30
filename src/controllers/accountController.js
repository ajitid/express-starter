const passport = require('passport')
const { getManager } = require('typeorm')

const Account = require('../db/models/Account')
const ResourceCreationError = require('../utils/errors/ResourceCreationError')

const db = getManager()

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login'
})

const logout = async (req, res) => {
  req.logout()
  return res.send('logged out')
}

const checkLoggedIn = (req, res) => {
  if (req.user) { return res.send('logged in') }
  return res.send('not logged in')
}

const signup = async (req, res) => {
  const { email, name, password } = req.body
  try {
    const { email: cleanedEmail } = Account.clean({ email })
    const existingAccount = await db.findOne(Account, { email: cleanedEmail })
    if (existingAccount) {
      throw new ResourceCreationError(Account.name, 'already exists with same email')
    }

    const account = await Account.createAccount(email, name, password)
    db.save(account)
    return res.send({ created: true, error: null })
  } catch (err) {
    return res.status(400).json({
      created: false,
      error: {
        name: err.name,
        message: err.message
      }
    })
  }
}

module.exports = {
  login,
  logout,
  checkLoggedIn,
  signup
}
