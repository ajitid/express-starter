const { Router } = require('express')
const passport = require('passport')
const { getManager } = require('typeorm')

const Account = require('../db/models/Account')

const router = Router()
const db = getManager()

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login'
}))

router.get('/logged-in', (req, res) => {
  console.log(req.isAuthenticated())
  if (req.user) { return res.send('logged in') }
  return res.send('not logged in')
})

router.post('/logout', async (req, res) => {
  req.logout()
  return res.send('logged out')
})

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body
  const account = await Account.createAccount(email, name, password)
  if (account === null) {
    return res.status(400).json({
      // FIXME add errors to json
      // error:,
      created: false
    })
  }
  db.save(account)
  return res.send({ error: null, created: true })
  // FIXME if error, respond with proper http code
})

module.exports = router
